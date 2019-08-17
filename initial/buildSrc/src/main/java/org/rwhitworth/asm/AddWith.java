package org.rwhitworth.asm;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.util.function.Consumer;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

import org.objectweb.asm.ClassReader;
import org.objectweb.asm.ClassVisitor;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.Type;

import org.objectweb.asm.commons.GeneratorAdapter;
import org.objectweb.asm.commons.Method;

public class AddWith {
    public static void main(final String args[]) throws Exception {
        System.out.println("cwd: " + Paths.get(".").toAbsolutePath().normalize().toString());
        FileInputStream is = new FileInputStream(args[0]);

        ClassReader cr = new ClassReader(is);
        ClassWriter delegate = new ClassWriter(ClassWriter.COMPUTE_FRAMES);
        AddWithWriter cw = new AddWithWriter(delegate);
        cr.accept(cw, 0);

        FileOutputStream fos = new FileOutputStream(args[1]);
        fos.write(delegate.toByteArray());
        fos.close();
    }

    public void withFoo() {
    }

    public void foo(int bar) {
    }

    public AddWith foo2(int bar) {
        return this;
    }

    public static AddWith fooStatic(int bar) {
        return new AddWith();
    }

    private static class AddWithWriter extends ClassVisitor {
        // TODO make immutable
        private static final Set<String> PROTECTED = new HashSet<>();
        static {
            PROTECTED.add("main");
            PROTECTED.add("<clinit>");
            PROTECTED.add("<init>");
        }

        private final List<Consumer<ClassWriter>> methodsToGenerate = new ArrayList<>();
        private final ClassWriter delegate;
        public AddWithWriter(final ClassWriter delegate) {
            super(Opcodes.ASM7, delegate);
            this.delegate = delegate;
        }

        private String currentClass;
        private Type currentClassType;

        @Override
        public void visit(int version,
                  int access,
                  String name,
                  String signature,
                  String superName,
                     String[] interfaces) {
            // TODO with inner classes, does this need to be a stack (and pop on visitEnd??
            this.currentClass = name;
            this.currentClassType = Type.getObjectType(name);
            super.visit(version, access, name, signature, superName, interfaces);
        }

        @Override
        public MethodVisitor visitMethod(final int access, String name,
                                         final String desc, final String signature, final String[] exceptions) {
            System.out.println("visiting " + currentClass + "::" + name);
            Type methodType = Type.getType(desc);
            System.out.println("access: " + access);
            System.out.println("static?: " + (access & Opcodes.ACC_STATIC));
            System.out.println("desc: " + desc);
            System.out.println("generic signature: " + signature);
            System.out.println("return type: " + methodType.getReturnType());
            System.out.println("return type int: " + methodType.getReturnType().getInternalName());
            System.out.println("arg types: " + methodType.getArgumentTypes());
            System.out.println("num args: " + methodType.getArgumentTypes().length);
            if (!name.startsWith("with") &&
                !PROTECTED.contains(name) &&
                ((access & Opcodes.ACC_STATIC) == 0) &&
                (methodType.getArgumentTypes().length == 1) &&
                methodType.getReturnType().getInternalName().equals(currentClass)) {

                String withName = "with" + name.substring(0,1).toUpperCase() + name.substring(1);
                System.out.println("delaying writing " + withName);
                methodsToGenerate.add(cw -> {
                        System.out.println("delayed generation of " + withName);
                        GeneratorAdapter mg = new GeneratorAdapter(access,
                                                                   new Method(withName, desc),
                                                                   signature,
                                                                   (exceptions == null) ?
                                                                     null :
                                                                     Arrays.stream(exceptions)
                                                                           .map(exName -> Type.getObjectType(exName))
                                                                           .toArray(Type[]::new),
                                                                   cw);
                        mg.loadThis();
                        mg.loadArgs();
                        mg.invokeVirtual(currentClassType, new Method(name, desc));
                        mg.returnValue();
                        mg.endMethod();
                    });
            }
            MethodVisitor mv = cv.visitMethod(access, name, desc, signature, exceptions);
            return mv;
        }

        @Override
        public void visitEnd()
        {
            for (Consumer<ClassWriter>generator : methodsToGenerate) {
                generator.accept(delegate);
            }
            cv.visitEnd();
        }
    }
}
