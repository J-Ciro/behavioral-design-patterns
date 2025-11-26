package com.sofka.ainative.withoutpattern;

import com.sofka.ainative.withoutpattern.controller.LightController;
import com.sofka.ainative.withoutpattern.view.ConsoleView;

public class App {
    public static void main(String[] args) {
        ConsoleView.printHeader();
        LightController controller = new LightController(false);
        String arg = args.length > 0 ? args[0].toLowerCase() : null;

        if (arg == null) { ConsoleView.printHelp(); return; }

        switch (arg) {
            case "on": controller.turnOn(); break;
            case "off": controller.turnOff(); break;
            default: ConsoleView.printHelp();
        }
    }
}
