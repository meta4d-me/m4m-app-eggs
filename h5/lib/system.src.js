var System = {};
System.models = {};
System.haveModels = {};
System.boolImport = false;
System.CheckFuill = function (key) {
  return key != "____imports____" && key != "____config____" && key != "____ready____";
}
System.register = function (_path, arrs, callback) {
  // console.log(_path);
  let self = this;
  if (!self.models[_path])
    self.models[_path] = {};
  let result = callback(function (pOrName, cls) {
    if (typeof (pOrName) == "object") {
      for (let k in pOrName) {
        if (self.CheckFuill(k))
          self.models[_path][k] = pOrName[k];
      }
    } else
      self.models[_path][pOrName] = cls;
  }, "");
  self.models[_path].____imports____ = arrs;
  self.models[_path].____config____ = result;
}
System.delete = function (_path) {

  if (_path && typeof (_path)) {
    let index = _path.indexOf("__usercode__/");
    if (index != -1) {
      _path = _path.substring(index);
      // console.log(`delete ${_path}`);
      delete System.models[_path];
    }
  }
}
System.init = function () {
  this.haveModels = {};
  for (let key in this.models) {
    let fails = [];
    this.modelInit(key, [], fails);
    for (let item of fails) {
      let __fails = [];
      this.modelInit(item, [], __fails);
    }
  }
  delete this.haveModels;
}
System.pathToName = function (_path) {
  let idx = _path.lastIndexOf("/");
  if (idx != -1)
    _path = _path.substring(idx + 1);
  return _path;
}
System.modelInit = function (key, paths, fails) {
  let model = this.models[key];
  this.haveModels[key] = model;
  paths.push(key);
  let lastModels = [];
  for (let i = 0, len = model.____imports____.length; i < len; ++i) {
    let ckey = model.____imports____[i];
    let cmodel = this.models[ckey];
    if (!cmodel) continue;
    if (paths.lastIndexOf(ckey) == -1 && !cmodel.____ready____)
      this.modelInit(ckey, paths, fails);
    else if (!cmodel.____ready____)
      lastModels.push(ckey);
    this.handleIndex(key, ckey, model, cmodel, paths);
    model.____config____.setters[i](cmodel);
  }
  if (!model.____ready____) {
    try {
      model.____config____.execute();
      model.____ready____ = true;
    } catch (e) {
      fails.push(key);
    }
  }
}

System.handleIndex = function (key, ckey, model, cmodel, paths, fails) {
  if (key.endsWith("index")) {
    {
      let nckey = this.pathToName(ckey);
      if ("default" in cmodel)
        model[nckey] = cmodel["default"];
      else {
        if (!(ckey in cmodel))
          this.modelInit(ckey, paths, fails);
        for (ck in cmodel) {
          if (!this.CheckFuill(ck))
            continue;
          if (!(ck in cmodel)) {
            this.modelInit(ck, paths, fails);
            for (let k in cmodel) {
              if (!this.CheckFuill(k))
                continue;
              model[k] = cmodel[k];
            }
          } else
            model[ck] = cmodel[ck];
        }
      }
    }
  }
}
System.get = function (fullpath) {
  let result = [];
  let model = this.models[fullpath];
  if (model)
    for (let key in model) {
      if (this.CheckFuill(key))
        result.push(model[key]);
    }
  return result;
}
System.import = function (_path) {
  if (window.wx) {
    console.warn("微信不支持此方法 请手动使用 require");
    return;
  }
  return new Promise((resolve, reason) => {
    let script = document.createElement("script");
    script.id = `sysmodel_${_path}`;
    script.src = _path;
    script.onload = function () {
      resolve();
    };
    script.onerror = function (e) {
      reason(e);
    };
    document.head.appendChild(script);

  });
}
window.System = System;