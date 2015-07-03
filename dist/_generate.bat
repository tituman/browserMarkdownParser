FOR %%X IN (*.md) DO ( TYPE _mediaDocu\_offpre.html %%X _mediaDocu\_offpost.html > "%%X.html" && start chrome "%~dp0%%X.html" )
FOR %%X IN (*.pnd) DO ( TYPE _mediaDocu\_offpre.html %%X _mediaDocu\_offpost.html > "%%X.html" && start chrome "%~dp0%%X.html" )
