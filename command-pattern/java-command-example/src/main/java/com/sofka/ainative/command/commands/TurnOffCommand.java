package com.sofka.ainative.command.commands;

import com.sofka.ainative.command.model.Light;

public class TurnOffCommand implements Command {
    private final Light light;

    public TurnOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() { light.turnOff(); }

    // undo removed to keep example focused and simple
}
