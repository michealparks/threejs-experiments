package main

import (
	"runtime";
	"os/exec";
	"fmt";
	"log";
	"net/http"
)

func openBrowser(url string) {
	var err error

	switch runtime.GOOS {
	case "linux": err = exec.Command("xdg-open", url).Start()
	case "windows": err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin": err = exec.Command("open", url).Start()
	}

	if err != nil {
		log.Fatal("Fatal error: ", err)
	}
}

func main() {
	fmt.Println("Serving files in the current directory on port 8000.")
	http.Handle("/threejs-experiments", http.FileServer(http.Dir("./pages")))
	http.Handle("/", http.FileServer(http.Dir("./pages")))
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("Fatal error: ", err)
	}

	openBrowser("http://localhost:5000")
}
