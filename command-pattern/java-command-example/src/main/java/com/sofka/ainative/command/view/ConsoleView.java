package com.sofka.ainative.command.view;

public class ConsoleView {
    public static void printHeader() {
        System.out.println("\n--- Command Pattern example (MVC + CLI) ---");
    }

    public static void printHelp() {
        System.out.println("\nUsage: gradle run --args=\"<on|off|undo|state>\"");
    }
}
