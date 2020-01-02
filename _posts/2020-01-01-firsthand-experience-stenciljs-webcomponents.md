---
layout: post
title: My firsthand experience with StencilJS and WebComponents
featured-img: firsthand-experience-stenciljs-webcomponents
author: RathiRohit
categories: [StencilJS, WebComponents, Web Development]
---
For the past few months I got a chance to work extensively on StencilJS (and thus WebComponents)
with existing Angular app being the host application. This post is overall summary of my experience
with Stencil and my personal remarks around it. I will be writing couple of other Stencil related
posts in coming days, so stay tuned.

For those who don't know, [StencilJS][stencil-site] is a compiler framework to build pure JS web
components with many batteries available out of the box.

> During development I worked on Stencil v1.2.3:green_apple: and this post has been written with
keeping the same in mind.

---

## Getting started with a web component ~~framework~~ compiler!
Though being different than usual web frameworks like React, Vue and Angular; Stencil does it's
job perfectly in hiding most of the complexities under the hood & providing cleaner and familiar
development experience right from the start.

Something I really loved while working in Stencil is it's blended structure that takes good things
from both React and Angular, be it TypeScript & Decorators like Angular or Lifecycle methods,
State management & TSX like React (Yes! 'T' instead of 'J' in JSX:grimacing:).

But one thing where Stencil sucks is the official [docs][stencil-docs]. Though it's pretty good for quick references
and starting off with Stencil, over the time I felt that when you go deeper into the complexities of
core stencil features (contexts, state-tunnels, testing, etc to name a few) you get to feel
lack of good code samples & lack of detailed and precise docs. I hope it will improve as the time
passes. Still the documentation helps a lot for new developers when it comes to configurations. From
output targets to Rollup configs, docs will help you with detailed explanation of what each of this
fields do and when to use what.

Overall learning curve to start building web components with Stencil (even for production use cases)
is not that difficult. And you will get used to it in small amount of time (even faster if you are
already familiar with other web frameworks like React).

## So, how well does it perform?
Stencil comes with many performance related batteries out of the box. File name cache bursts,
runtime detection of required polly-fills, component lazy loading, automated file chunks & smart
bundling of related components provides lots of performance improvements. Stencil also
[claims][stencil-claims] to be using Virtual-DOM and Async rendering under the hood, which should
also be contributing in improved rendering speeds. Warat Wongmaneekit has done a detailed comparison
of performance of different Web Component frameworks in his blog post [here][stencil-performance-medium-post].

Some of these pre-included batteries like lazy loading of components can cause unwanted delays in
initial first rendering. I will visit this again in detail later in the post.

## Browser compatibility
Stencil compiles components into native browser compatible web-components which means whatever you
build with Stencil will work on all browsers that support web-component specs. This includes all
major browsers like Chrome, Firefox & Safari. Moreover Stencil supports other browsers like Edge
and IE11 by fetching corresponding polly-fills at runtime depending on detected browser only if
required. [This][stencil-browser-compatibility] compatibility guide pretty much sums it all.

There will be some issues like how tab-indexing works with web-components or how different
browsers handle minor specs when it comes to shadow DOMs and custom elements, duplication of
internal styles when shadow DOM is used, but again these are very minor issues and more of
web-components problems than StencilJS.

## Integrating with other frameworks (Host applications)
As we are specifically discussing about reusable component building of Stencil, final chapter
after building and bundling a component will be integrating and using it inside host application.
Components generated with Stencil are native web-components which means you can use them directly
in HTML of host apps like you use `<div>` or `<img/>` tags (yes it's that straight forward).

But before using them, we need to somehow tell the host app about our web-components, and this is
where integrations comes into picture. There are numerous ways to publish your component bundle to
use it in host app (more on this in future posts). Once published, you can import those in your
host app as node modules and then use `defineCustomElement()` from the module during bootstrapping
of host app. On the other hand one can also directly include component files from CDN as direct
scripts in HTML and they will work fine too.

As the components are native browser standards they work with all frameworks and vanillaJS hosts.
Believe me, even after working previously in React and other frameworks, using just a simple HTML
like tag in host app and getting the Stencil component rendered right there, without any js imports
feels very magical.

## Perks and Problems of using Stencil
TypeScript and Decorators help in avoiding boilerplate code throughout the component and hence
improves overall readability of component. Some of the decorators like `@Event()` & `@Listen()`
can become very handy when creating event emitters & listeners in Stencil.

Stencil comes by default with Jest & Puppeteer integrated for unit & e2e testing respectively. One
can simply pass all testing related configurations through same stencil configs and stencil will
pass those on to underlying jest configs. Though I did not use e2e testing part of Stencil, I used
Stencil's Jest wrappers for unit testing components. Stencil folks can do
better in this regard. Current Jest wrappers and unit testing of Components feels bit restricted
and does not give much freedom to developers on testing front. And again, testing docs for this is
not well documented to utilize it in full potential.

Lazy loading in stencil allows runtime lazy fetching of actual chunks right before the component is
going to be used in host app. Though this saves initial app load time, it adds a small blank white
screen before component loads over the network. One has to understand that this white lag will only
be there for first rendering when component files load over the network and not afterwards. And there
is no real way to stop this feature as Stencil does not provide any config to disable lazy loading of
chunks (there has been few updates in recent version around this, but I haven't looked into those in
detail yet). There are hacks to avoid this initial lag by creating hidden duplicate element beforehand
or using host element loader to hide this but still it would be better if it comes out of the box
with stencil.

Proper functional components is something that I really missed while working with Stencil. Though
stencil docs mentions functional components it still feels very immature, same as other parts of
Stencil like testing and lifecycle APIs.

Stencil community is fast growing and some of these problems might get solved in very near future.
Stencil's slack community is also very prompt in providing solutions and updates on problems you
might face during development.

## Uncovered bits
Though I have used Stencil in its depth there are still few bits that remain uncovered and hence I
would not be commenting on them without using them. Some of these are Stencil pre-rendering,
state tunnels, e2e testing, web workers, service workers, etc.

## Some final remarks
Overall Stencil has great potential and can be very useful for building robust yet highly reusable
web-components that work almost everywhere. In my personal opinion, as the component grows bigger and
incorporates more business logic inside, it will increase coupling with outer host application too.
And more the coupling lesser the re-usability. That means one should focus on keeping components as
concise as possible and use web-components only if they are going to be reused and are generic by
nature.

To me Stencil always felt bit too opinionated about the way it works (testing, lack of flexible
configs, overall design of [component APIs][stencil-component-apis], etc), sure this will change as the time goes and community
around Stencil grows. Still in general, Stencil can surely be used for production apps if requirements
are inline with building reusable and decoupled web-components.

[stencil-site]: https://stenciljs.com/
[stencil-docs]: https://stenciljs.com/docs/getting-started
[stencil-claims]: https://stenciljs.com/docs/introduction
[stencil-performance-medium-post]: https://medium.com/@thangman22/stencil-js-vs-lit-element-vs-vanilla-vs-shadow-dom-vs-vue-js-5d2ade971183
[stencil-browser-compatibility]: https://stenciljs.com/docs/browser-support
[stencil-component-apis]: https://stenciljs.com/docs/decorators
