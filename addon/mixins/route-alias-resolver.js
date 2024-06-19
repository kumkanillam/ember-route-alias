import Ember from 'ember';
import Resolver from 'ember-resolver';
import { isArray } from '@ember/array';

export default class RouteAliasResolver extends Resolver{

  /**
  Push the new module name lookup pattern on to the list of previous lookup
  patterns.
  */
 constructor(){
  super(...arguments);
  if(isArray(this.moduleNameLookupPatterns))
  this.moduleNameLookupPatterns.push(this.aliasedModuleName);
 }

  /**
  Check to see if the targeted module has an alias in the lookup. If this lookup
  function is invoked we've already missed finding a direct hit for this module,
  making this safe.
  */
  aliasedModuleName(parsedName) {
    // Short circuit if you're not aliased or a type we care about for aliasing.
    if (!this.namespace || !this.namespace._routeAliasLookup) { return false; }
    if (!~['controller','route','template','view'].indexOf(parsedName.type)) { return false; }

    // See if the key we have is in the lookup.
    // If it is, traverse through the lookup "recursively" until we hit a leaf node.
    let alias;
    let key = parsedName.fullNameWithoutType;
    while (this.namespace._routeAliasLookup[key]) {
      alias = this.namespace._routeAliasLookup[key];
      key = alias;
    }

    // If we found something in the lookup, return it. Otherwise, proceed to the next resolver.
    if (alias) {
      return parsedName.prefix + '/' +  this.pluralize(parsedName.type) + '/' + alias;
    } else {
      return false;
    }
  }
};
