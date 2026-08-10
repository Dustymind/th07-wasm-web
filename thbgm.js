
  if (!Module['expectedDataFileDownloads']) Module['expectedDataFileDownloads'] = 0;
  Module['expectedDataFileDownloads']++;
  (() => {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    var isPthread = typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD;
    var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != 'undefined' && ENVIRONMENT_IS_WASM_WORKER;
    if (isPthread || isWasmWorker) return;
    var isNode = globalThis.process && globalThis.process.versions && globalThis.process.versions.node && globalThis.process.type != 'renderer';
    async function loadPackage(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.substring(0, location.pathname.lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'C:/Users/Yakumo_Koishi/repos/th07-reallyportable/build-web/thbgm.data';
      var REMOTE_PACKAGE_BASE = 'thbgm.data';
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
      var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      async function fetchRemotePackage(packageName, packageSize) {
        if (isNode) {
          var contents = require('fs').readFileSync(packageName);
          return new Uint8Array(contents).buffer;
        }
        if (!Module['dataFileDownloads']) Module['dataFileDownloads'] = {};
        try {
          var response = await fetch(packageName);
        } catch (e) {
          throw new Error(`Network Error: ${packageName}`, {e});
        }
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.url}`);
        }

        const chunks = [];
        const headers = response.headers;
        const total = Number(headers.get('Content-Length') || packageSize);
        let loaded = 0;

        Module['setStatus'] && Module['setStatus']('Downloading data...');
        const reader = response.body.getReader();

        while (1) {
          var {done, value} = await reader.read();
          if (done) break;
          chunks.push(value);
          loaded += value.length;
          Module['dataFileDownloads'][packageName] = {loaded, total};

          let totalLoaded = 0;
          let totalSize = 0;

          for (const download of Object.values(Module['dataFileDownloads'])) {
            totalLoaded += download.loaded;
            totalSize += download.total;
          }

          Module['setStatus'] && Module['setStatus'](`Downloading data... (${totalLoaded}/${totalSize})`);
        }

        const packageData = new Uint8Array(chunks.map((c) => c.length).reduce((a, b) => a + b, 0));
        let offset = 0;
        for (const chunk of chunks) {
          packageData.set(chunk, offset);
          offset += chunk.length;
        }
        return packageData.buffer;
      }

      var fetchPromise;
      var fetched = Module['getPreloadedPackage'] && Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE);

      if (!fetched) {
        // Note that we don't use await here because we want to execute the
        // the rest of this function immediately.
        fetchPromise = fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE);
      }

    async function runWithFS(Module) {

      function assert(check, msg) {
        if (!check) throw new Error(msg);
      }
Module['FS_createPath']("/", "bgm", true, true);

      async function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData ' + arrayBuffer.constructor.name);
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          for (var file of metadata['files']) {
            var name = file['filename'];
            var data = byteArray.subarray(file['start'], file['end']);
            // canOwn this data in the filesystem, it is a slice into the heap that will never change
        Module['FS_createDataFile'](name, null, data, true, true, true);
          }
          Module['removeRunDependency']('datafile_C:/Users/Yakumo_Koishi/repos/th07-reallyportable/build-web/thbgm.data');
      }
      Module['addRunDependency']('datafile_C:/Users/Yakumo_Koishi/repos/th07-reallyportable/build-web/thbgm.data');

      if (!Module['preloadResults']) Module['preloadResults'] = {};

      Module['preloadResults'][PACKAGE_NAME] = {fromCache: false};
      if (!fetched) {
        fetched = await fetchPromise;
      }
      await processPackageData(fetched);

    }
    // Detect whether the module JS file has already been loaded.
    if (Module['FS_createPath']) {
      runWithFS(Module);
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module['preRun'].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/bgm/bgm_manifest.json", "start": 0, "end": 1778}, {"filename": "/bgm/th07_01.ogg", "start": 1778, "end": 1790799}, {"filename": "/bgm/th07_02.ogg", "start": 1790799, "end": 3417803}, {"filename": "/bgm/th07_03.ogg", "start": 3417803, "end": 4687555}, {"filename": "/bgm/th07_04.ogg", "start": 4687555, "end": 7471589}, {"filename": "/bgm/th07_05.ogg", "start": 7471589, "end": 8536440}, {"filename": "/bgm/th07_06.ogg", "start": 8536440, "end": 11134822}, {"filename": "/bgm/th07_07.ogg", "start": 11134822, "end": 14597192}, {"filename": "/bgm/th07_08.ogg", "start": 14597192, "end": 19780296}, {"filename": "/bgm/th07_09.ogg", "start": 19780296, "end": 22777646}, {"filename": "/bgm/th07_10.ogg", "start": 22777646, "end": 25606455}, {"filename": "/bgm/th07_11.ogg", "start": 25606455, "end": 27732271}, {"filename": "/bgm/th07_12.ogg", "start": 27732271, "end": 29000369}, {"filename": "/bgm/th07_13.ogg", "start": 29000369, "end": 31989196}, {"filename": "/bgm/th07_13b.ogg", "start": 31989196, "end": 33950802}, {"filename": "/bgm/th07_14.ogg", "start": 33950802, "end": 35222973}, {"filename": "/bgm/th07_15.ogg", "start": 35222973, "end": 37247886}, {"filename": "/bgm/th07_16.ogg", "start": 37247886, "end": 40094169}, {"filename": "/bgm/th07_17.ogg", "start": 40094169, "end": 44843386}, {"filename": "/bgm/th07_18.ogg", "start": 44843386, "end": 47845121}, {"filename": "/bgm/th07_19.ogg", "start": 47845121, "end": 51072192}], "remote_package_size": 51072192});

  })();
