package main

import (
	"log"
	"os"
	"strings"
	"unicode/utf16"

	"golang.org/x/sys/windows"
)

type directory struct {
	Url string `json:"url"`
	Err string `json:"error"`
}

type entryList struct {
	Entries []entry `json:"entries"`
	Err     string  `json:"error"`
}

type entry struct {
	Name    string `json:"name"`
	IsDir   bool   `json:"isDirectory"`
	ModTime string `json:"modTime"`
	Size    int64  `json:"size"`
}

func (a *App) GetDrives() []string {
	n, e := windows.GetLogicalDriveStrings(0, nil)
	if e != nil {
		log.Fatal(e.Error())
	}
	arr := make([]uint16, n)
	windows.GetLogicalDriveStrings(n, &arr[0])
	s := string(utf16.Decode(arr))
	return strings.Split(strings.TrimRight(s, "\x00"), "\x00")
}

func (a *App) GetHomeDirectory() directory {
	dirname, err := os.UserHomeDir()
	if err != nil {
		log.Fatal(err)
		return directory{Url: "", Err: err.Error()}
	}
	return directory{Url: dirname, Err: ""}
}

func (a *App) GetDirectoryContent(currentDir string) entryList {
	entries, err := os.ReadDir(currentDir)
	if err != nil {
		return entryList{Entries: nil, Err: err.Error()}
	}
	parsedEntries := []entry{}
	for _, v := range entries {
		fi, err := v.Info()

		if err != nil {
			log.Fatal("Error reading file", err)
		}

		parsedEntries = append(parsedEntries, entry{
			Name:    v.Name(),
			IsDir:   v.IsDir(),
			Size:    fi.Size(),
			ModTime: fi.ModTime().String(),
		})
	}

	return entryList{Entries: parsedEntries, Err: ""}
}
