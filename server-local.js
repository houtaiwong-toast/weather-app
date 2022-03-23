'use strict';

import app from './dist-server/server';

app.listen(3000, () =>
  console.log('Local app listening on port 3000!')
);
