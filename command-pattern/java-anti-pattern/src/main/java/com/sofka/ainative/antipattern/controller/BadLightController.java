package com.sofka.ainative.antipattern.controller;

import com.sofka.ainative.antipattern.model.Light;
import java.util.ArrayList;
import java.util.List;

public class BadLightController {
    private final Light light;
    // anti-pattern: controller mixes responsibilities (keeps CLI and business logic together)

    public BadLightController(boolean initial) { this.light = new Light(initial); }

    public void handleInput(String input) {
        if (input == null) {
            System.out.println("Please pass `on`, `off` or `state`.");
            return;
        }
        String cmd = input.toLowerCase();
        switch (cmd) {
            case "on":
                System.out.println("Bad Controller -> turning ON the light (tight coupling)");
                light.turnOn();
                break;
            case "off":
                System.out.println("Bad Controller -> turning OFF the light (tight coupling)");
                light.turnOff();
                break;

            default:
                System.out.println("Invalid command. This controller contains CLI and business logic.");
        }
    }
}
