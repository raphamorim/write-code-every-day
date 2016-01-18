git pull origin master
npm run populate
npm run static
git commit -am "update data"
git push origin master
git checkout gh-pages
git merge --no-ff master
git rm src/* challengers.js
git add index.html
git commit -m "update site"
git push origin gh-pages