package com.sofka.ainative.command.commands;

import com.sofka.ainative.command.model.Light;

public class TurnOnCommand implements Command {
    private final Light light;

    public TurnOnCommand(Light light) {
        this.light = light;
    }


    @Override
    public void execute() { light.turnOn(); }

    // undo removed to keep example focused and simple
}
