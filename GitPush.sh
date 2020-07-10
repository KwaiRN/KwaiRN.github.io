who=`whoami`
commitMessage="Auto Commit [by ${who}]"

if [ $# -gt 0 ] ; then
	commitMessage=$*" [by ${who}]"
fi

git pull --rebase
git add .
git commit -m "$commitMessage"
git push