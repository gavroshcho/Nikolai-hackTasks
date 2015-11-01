'use strict';

var fs = require("fs");
var packages = require("./all_packages.json");
var dependencies = require("./dependencies.json");
var exec = require("child_process").exec;

var libraries = [];

function installModule(name, cb) {
  if (!fs.existsSync("installed_modules")) {
    fs.mkdirSync("installed_modules");
  }

  if (isInstalled(name)) {
    console.log(name + " is already installed. Moving on.");
    cb();
  } else {
    console.log("Installing " + name);
    exec("touch installed_modules/" + name + ".js", function(err, stdout, stderr) {
      cb(err);
    });
  }
}

function isInstalled(name) {
  return fs.existsSync("installed_modules/" + name + ".js");
}

function install() {
  for (var lib in packages) {
    var dependencies = packages[lib];
    libraries.push(lib);
  }

  installAndNext();
}

function installDependencies(name, cb) {
  if (packages[name].length) {
    logDependencies(name);
    for (var i = 0, len = packages[name].length; i < len; i++) {
      var counter = 0;
      installModule(packages[name][i], function(err, stdout) {
        counter += 1;

        if (counter >= packages[name].length) cb();
      });
    }
  } else {
    cb();
  }
}

function installAndNext() {
  installModule(libraries[0], function(err, stdout) {
    var dep = packages[libraries[0]]

    if (err) {
      console.log("Something went wrong.");
    } else {
      installDependencies(libraries[0], function(err, stdout) {
        libraries.shift();
        if (libraries.length) {
          installAndNext();
        } else {
          console.log("All done.");
        }
      });
    }
  });
}

function logDependencies(lib) {
  var str = "In order to use " + lib + ", we need ";

  for (var i = 0, len = packages[lib].length; i < len; i++) {
    if (i > 0) str += "and ";
    str += packages[lib][i] + " ";
  }

  console.log(str);
}

install();
