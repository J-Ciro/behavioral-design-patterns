package com.sofka.ainative.command;

import com.sofka.ainative.command.controller.LightController;
import com.sofka.ainative.command.view.ConsoleView;

public class App {
    public static void main(String[] args) {
        ConsoleView.printHeader();

        LightController controller = new LightController();
        String arg = args.length > 0 ? args[0].toLowerCase() : null;

        if (arg == null) {
            ConsoleView.printHelp();
            return;
        }

        switch (arg) {
            case "on":
                System.out.println("Action: TURN ON");
                controller.turnOn();
                break;
            case "off":
                System.out.println("Action: TURN OFF");
                controller.turnOff();
                break;
            default:
                ConsoleView.printHelp();
        }
    }
}
