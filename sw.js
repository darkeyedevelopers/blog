/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","74d692a73660a1f127185ecf8ce8f8bb"],["/about/index.html","77377d0f1e0c2a867bc1a981235aa609"],["/assets/css/main.css","b5dfdb4ebb2516158dbc6840e34fe25f"],["/assets/img/favicon.jpg","813e9e8fef404923dabcd4a33e71f5f8"],["/assets/img/icons/android-chrome-192x192.png","d02774be82158bc97c8ed05c37f9b692"],["/assets/img/icons/android-chrome-256x256.png","1f444a32c9479771cbc676a6d1918128"],["/assets/img/icons/apple-touch-icon.png","b4cdd67fdcb3e9e9ebf87428f1f4f438"],["/assets/img/icons/favicon-16x16.png","f4ce92787e7ed799dce9fad81513a46d"],["/assets/img/icons/favicon-32x32.png","0acbbc1a5c0f837897da9951dd1f1cb9"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","f9476e4c0577baf0c8a851a1f260420b"],["/assets/img/icons/safari-pinned-tab.svg","a64519740b0dc40c45dfff7cf709e596"],["/assets/img/posts/dedblog.jpg","bb5f40feca89acd0b801c8762e09799e"],["/assets/img/posts/dedblog_lg.jpg","bb5f40feca89acd0b801c8762e09799e"],["/assets/img/posts/dedblog_md.jpg","6f58c263c001a63b23510c3f568119d0"],["/assets/img/posts/dedblog_placehold.jpg","e2e344de584bcefef70687b1b5fd4032"],["/assets/img/posts/dedblog_sm.jpg","518e00e488213952280c089dcbc7124e"],["/assets/img/posts/dedblog_thumb.jpg","80b3dda766d5940978b965920b8fe249"],["/assets/img/posts/dedblog_thumb@2x.jpg","9e4e9019232056ad2d476c478d96b8f5"],["/assets/img/posts/dedblog_xs.jpg","a0def869711aaf1c126bc52d15913ad7"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/general/ettercap-log.png","6aadaaad70e8971d0575318f59dae591"],["/assets/img/posts/general/ettercap-targets.png","b3674389090c34b74158abeb0ab8bf13"],["/assets/img/posts/general/github-jekyll-image.png","ff9047cdfba4c032925e775b1e197536"],["/assets/img/posts/general/mac-spoof.png","5c1fb9a16668f923b96da1e8c17fdca7"],["/assets/img/posts/general/router-ip.png","f907fc3fabda2feb423b59a7934dd68e"],["/assets/img/posts/how-we-sniffed-passwords-teachers-increasing-attendance.jpg","8a18b00294aea0576cd305a34127189c"],["/assets/img/posts/how-we-sniffed-passwords-teachers-increasing-attendance_lg.jpg","8a18b00294aea0576cd305a34127189c"],["/assets/img/posts/how-we-sniffed-passwords-teachers-increasing-attendance_md.jpg","829349235808dc529e389c6cd5f00059"],["/assets/img/posts/how-we-sniffed-passwords-teachers-increasing-attendance_placehold.jpg","82f7175b7ab96cc9ad35ad56d8ff19fe"],["/assets/img/posts/how-we-sniffed-passwords-teachers-increasing-attendance_sm.jpg","95f960e20a4dfb30141648549949495c"],["/assets/img/posts/how-we-sniffed-passwords-teachers-increasing-attendance_thumb.jpg","830e5b3f0ef898481c94a98c7a2d5c45"],["/assets/img/posts/how-we-sniffed-passwords-teachers-increasing-attendance_thumb@2x.jpg","ae9e0a9b10e2aeccdf697a344f59aff7"],["/assets/img/posts/how-we-sniffed-passwords-teachers-increasing-attendance_xs.jpg","2480fe443f97c9e0ad03e561a133270f"],["/assets/img/posts/one-more-blog.jpg","88009991c7d90491d5e7f504b7291ae5"],["/assets/img/posts/one-more-blog_lg.jpg","88009991c7d90491d5e7f504b7291ae5"],["/assets/img/posts/one-more-blog_md.jpg","af4de749db2d1d13eaa7e8b6cec60ae2"],["/assets/img/posts/one-more-blog_placehold.jpg","fb5d38231b22a5b69852f3319f4bd02b"],["/assets/img/posts/one-more-blog_sm.jpg","30d68163c8016c2d1def2bcb6af6f394"],["/assets/img/posts/one-more-blog_thumb.jpg","086bf89d6fca105d325ac5c68591ef7c"],["/assets/img/posts/one-more-blog_thumb@2x.jpg","b0d8cd0400768fa9be770b5df00d4e79"],["/assets/img/posts/one-more-blog_xs.jpg","5781359aa13f2dd9b018a40cfabe7ba1"],["/assets/img/posts/quickly-deploy-your-django-app-heroku.png","92cd2a68156f14872c14674774fad9a7"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/js/bundle.js","df854a763d7d3fd95381b95081eb822f"],["/categories/index.html","d4d15b5ae99f9f1efb30f59a711be457"],["/contact/index.html","4060459c1c674c0aa9b68a1988ed2e85"],["/how-we-sniffed-passwords-teachers-increasing-attendance/index.html","9578082b16ffe0a1a460d6a76f24bc1b"],["/index.html","be9c0014dd964ffbe000a08fcd18e996"],["/one-more-blog/index.html","348384a60424a34c617414e74d87f899"],["/quickly-deploy-your-django-app-heroku/index.html","c4ac6f156a3d0eb4ec941e9467699a1c"],["/series/index.html","9ce8069a5160701fd044af1805117284"],["/sw.js","0f4188f6fcea52de7e6cafbddc0cccb3"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







