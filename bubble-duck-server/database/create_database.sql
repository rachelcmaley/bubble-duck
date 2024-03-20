-- The following line terminates any active connections to the database so that it can be dropped
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity 
WHERE datname = 'skincare';

DROP DATABASE IF EXISTS skincare;

-- then create the database
CREATE DATABASE skincare;