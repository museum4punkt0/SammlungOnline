@echo off

set schema_file=src\main\graphql\schema.graphql
set admin_secret=jcG8QBI5g8OX
set endpoint=http://localhost:8081/v1/graphql

echo Downloading schema from %endpoint%...
call .\gradlew.bat downloadApolloSchema --endpoint="%endpoint%" --schema="%schema_file%" --header="X-Hasura-Admin-Secret: %admin_secret%" > nul
if not %ERRORLEVEL%==0 goto Error


echo Update complete. 
echo.
echo Schema is located at %schema_file% 
echo NOTE: There may be an issue with "null: Boolean" in the schema if 
echo       Strapi remote schemas are included during schema update. 
echo       In this case just remove the respective lines from the schema file
echo       or make sure, Strapi remote schemas are not included after all.
goto :End

:Error
echo.
echo Update failed.

:End
pause
