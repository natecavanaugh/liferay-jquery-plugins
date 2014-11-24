# liferay-jquery-plugins

jQuery Plugins for Liferay Portal

## Building

### Get the environment up and running
#### Clone this repo
```
	git clone https://github.com/natecavanaugh/liferay-jquery-plugins.git
```
#### Install [http://nodejs.org](Node)
#### Install [http://gulpjs.com](Gulp)
```
	<sudo> npm install --global gulp
```
#### Install [http://bower.io](Bower)
```
	<sudo> npm install --global bower
```

### Load up the needed modules
```
	npm install
```

### Create the build files
```
	gulp build
```

The build files will be in `liferay-jquery-plugins/build/` inside of either the `jquery` directory or the `liferay` directory, depending on your destination.

## Testing

From the browser, go to `file://path/to/liferay-jquery-plugins/test/fm/`

From the CLI:
```
	gulp test
```

## License

Copyright (c) 2014 Nate Cavanaugh/Liferay, Inc. Licensed under the MIT license.