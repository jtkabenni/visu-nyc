\echo 'Delete and recreate visunyc db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE visunyc;
CREATE DATABASE visunyc;
\connect visunyc

\i visu-nyc-schema.sql
\i visu-nyc-seed.sql

\echo 'Delete and recreate jvisunyc_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE visunyc_test;
CREATE DATABASE visunyc_test;
\connect visunyc_test

\i visu-nyc-schema.sql
