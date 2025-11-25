package com.sofka.ainative.command.controller;

import com.sofka.ainative.command.commands.TurnOffCommand;
import com.sofka.ainative.command.commands.TurnOnCommand;
import com.sofka.ainative.command.invoker.RemoteControl;
import com.sofka.ainative.command.model.Light;

public class LightController {
    private final RemoteControl remote;
    private final Light light;

    public LightController() {
        this.light = new Light();
        this.remote = new RemoteControl(this.light);
    }

    public void turnOn() { remote.setCommand(new TurnOnCommand(light)); }
    public void turnOff() { remote.setCommand(new TurnOffCommand(light)); }


}
