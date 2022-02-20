# 该脚本仅用于本地发布测试包

npm run lib

$pkg = Get-Content -Path "./package.json"
$pkg = $pkg.Replace("https://registry.npmjs.org/","http://pi.iamoldli.com:1084/repository/npm-hosted/")
Set-Content -Path "./package.json" -Value $pkg

npm publish

$pkg = $pkg.Replace("http://pi.iamoldli.com:1084/repository/npm-hosted/","https://registry.npmjs.org/")
Set-Content -Path "./package.json" -Value $pkg