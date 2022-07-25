import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'dummy/config/environment';
import RouteAliasResolver from 'ember-route-alias/mixins/route-alias-resolver';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver.extend(RouteAliasResolver);
}

loadInitializers(App, config.modulePrefix);
