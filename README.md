# voice-engine-js-hydra-demo

Voice Engine JS demo to access Hydra APIs.
A very simple approach to make dynamic requests to resources described by a Hydra API documentation.

## Usage

The audio input is read via the `respeakerd` library.
If no supported device is available it can be still tested with the command line tool.
The speech to text processing is done via Google.
Therefore a Google API key with access to the speech to text API is required.
There is already a `run-example.sh` script which shows how to configure and run the application with the [dark-horse-bridge-hue](https://github.com/bergos/dark-horse-bridge-hue).
Copy it to `run.sh` and fill in your key.

## Command line tool

This package also contains a command line tool to process text directly from the shell.
The text must be given as additional parameters like: `node cli -e http://localhost:3000/group/ turn on the light in the office`

## Supported endpoints

The application should work with any API which has a Hydra API documentation.
Because of the simple approach it may not work with many applications right now.
It was tested successfully with the [dark-horse-bridge-hue](https://github.com/bergos/dark-horse-bridge-hue).
Try it with the command `turn on/off the ligh in the $ROOM_NAME`.
