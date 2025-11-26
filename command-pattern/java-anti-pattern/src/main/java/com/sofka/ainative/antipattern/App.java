package com.sofka.ainative.antipattern;

import com.sofka.ainative.antipattern.controller.BadLightController;

public class App {
    public static void main(String[] args) {
        System.out.println("\n--- Anti-pattern example (controller is tightly coupled) ---");
        // simple in-memory example — no persisted state; controller handles everything (anti-pattern)
        BadLightController controller = new BadLightController(false);
        String arg = args.length > 0 ? args[0] : null;
        controller.handleInput(arg);
    }
}
