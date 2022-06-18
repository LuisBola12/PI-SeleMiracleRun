/* eslint-disable no-undef */

import { isInDateRange } from '../src/utils/dateManager';


test( 'Verify date in range', () => {
  const initialDate = new Date();
  const dateToVerify = new Date();
  const finalDate = new Date();
  expect( isInDateRange( initialDate,finalDate, dateToVerify ) ).toBe ( true );
} );