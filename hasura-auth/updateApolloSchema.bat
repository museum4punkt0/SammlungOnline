@echo off

set schema_file=src\main\graphql\schema.json
set auth_header=authservice:authservice
set endpoint=https://smb-api.xailabs.dev/v1/graphql

echo Downloading schema from %endpoint%...
call .\gradlew.bat downloadApolloSchema --endpoint="%endpoint%" --schema="%schema_file%.tmp" --header="Authorization: %auth_header%" > nul
if not %ERRORLEVEL%==0 goto Error

python -m json.tool "%schema_file%.tmp" > "%schema_file%"
del "%schema_file%.tmp"

echo Update complete. 
echo.
echo Now open %schema_file% 
echo in IntelliJ and hit the green triangle to create the graphql file from json. 
echo If you don't have IntelliJ... well... then figure out something else :-P
echo.
goto :End

:Error
echo.
echo Update failed.

:End
pause
