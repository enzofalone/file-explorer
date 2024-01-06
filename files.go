package main

import (
	"fmt"
	"os/exec"
)

func (a *App) ExecuteFile(path string) {
	cmd := exec.Command(path)
	if err := cmd.Run(); err != nil {
		fmt.Println(err)
	}
}
