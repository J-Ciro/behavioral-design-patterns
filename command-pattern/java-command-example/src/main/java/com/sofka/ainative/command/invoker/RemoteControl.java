package com.sofka.ainative.command.invoker;

import com.sofka.ainative.command.commands.Command;
import com.sofka.ainative.command.model.Light;


public class RemoteControl {
    private Light light;

    public RemoteControl() {}

    public RemoteControl(Light light) { this.light = light; }

    public void setCommand(Command cmd) {
        cmd.execute();
    }

}
