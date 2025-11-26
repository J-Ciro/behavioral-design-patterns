package com.sofka.ainative.withoutpattern.view;

public class ConsoleView {
    public static void printHeader() { System.out.println("\n--- Without Command Pattern example (MVC + CLI) ---"); }
    public static void printHelp() { System.out.println("\nUsage: gradle run --args=\"<on|off|undo|state>\""); }
}
