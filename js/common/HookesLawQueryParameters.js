// Copyright 2015-2017, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );

  var HookesLawQueryParameters = QueryStringMachine.getAll( {

    // checks all Check Boxes, to make development easier
    checkAll: { type: 'flag' },

    // Determines whether update cycles are allowed for Properties instrumented for PhET-iO.
    // Set this to false to identify such cycles. It will likely be impossible to eliminate all cycles.
    // See https://github.com/phetsims/hookes-law/issues/52
    reentrant: {
      type: 'boolean',
      defaultValue: true
    }
  } );

  hookesLaw.register( 'HookesLawQueryParameters', HookesLawQueryParameters );

  // log the values of all sim-specific query parameters
  phet.log && phet.log( 'query parameters: ' + JSON.stringify( HookesLawQueryParameters, null, 2 ) );

  return HookesLawQueryParameters;
} );
