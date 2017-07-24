FOR %%X IN (*.md) DO ( TYPE _mediaDocu\_offpre.html "%%X" _mediaDocu\_offpost.html > "%%~nX.html" && start chrome "%~dp0%%~nX.html" )

FOR %%X IN (*.pnd) DO ( TYPE _mediaDocu\_offpre.html "%%X" _mediaDocu\_offpost.html > "%%~nX.html" && start chrome "%~dp0%%~nX.html" )
