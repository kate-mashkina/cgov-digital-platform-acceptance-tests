beforeEach(() => {
  // Create an image proxy to handle intercepting
  // analytics calls.

  cy.on('window:before:load', (win) => {

    cy.AnalyticsStorage = [];
    const NativeImage = Image;

    class AnalyticsInterceptingImage {
      constructor(w, h) {
        const nativeImage = new NativeImage(w, h);
        const handler = {
          set: function (obj, prop, value) {
            if (prop === 'src') {
              cy.AnalyticsStorage.push(new Beacon(value));
              console.log(cy.AnalyticsStorage)
            }

            return nativeImage[prop] = value;
          },
          get: function (target, prop) {
            let result = target[prop];
            if (typeof result === 'function') {
              result = result.bind(target);
            }
            return result;
          }
        };
        const prox = new Proxy(nativeImage, handler);
        try {
          prox[Symbol.toStringTag] = 'HTMLImageElement';
        } catch (e) { }
        return prox;
      }
    }

    AnalyticsInterceptingImage.prototype[Symbol.toStringTag] = NativeImage.prototype.toString();

    Object.defineProperty(AnalyticsInterceptingImage, 'name', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: 'Image'
    });

    if ('toSource' in NativeImage) { // FF extra
      Object.defineProperty(AnalyticsInterceptingImage, 'toSource', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: function () {
          return NativeImage.toSource();
        }
      });
    }

    Object.defineProperty(AnalyticsInterceptingImage, 'toString', {
      enumerable: true,
      configurable: false,
      writable: true,
      value: function () {
        return NativeImage.toString();
      }
    });

    win.Image = AnalyticsInterceptingImage;
  })

});


function Beacon(rawUrl) {
  let urlObject = new URL(rawUrl),
    params = new URLSearchParams(urlObject.search);
  let result = new Map();
  for (let param of params) {
    let key = param[0];
    let value = param[1];
    result.set(key, value);
  }
  this.getParams = function () {
    return result;
  };
}


