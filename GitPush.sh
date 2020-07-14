who=`whoami`
commitMessage="Auto Commit [by ${who}]"

if [ $# -gt 0 ] ; then
	commitMessage=$*" [by ${who}]"
fi

git add .
git commit -m "$commitMessage"
git pull --rebase
git push