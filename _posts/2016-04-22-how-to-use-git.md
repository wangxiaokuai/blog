---
title: "猎奇 | Git的使用"
layout: post
date: 2016-04-22
thumbnail: "img/thumbnail/how-to-use-git.jpg"
---

> 要会敲Git命令，也要明白命令后面的实际意义；更要懂Git的工作原理。

> 本文参考文档：[Pro Git（中文版）](http://git.oschina.net/progit/index.html)。文章是老外写的，分析得相当的全面和透彻。


![Picture from unsplash](http://upload-images.jianshu.io/upload_images/1859030-73d966ff89df5767.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 版本控制
版本控制就两个目的：第一，保存历史版本；第二，多人协作。

* Git是什么？
Git是目前世界上最先进的分布式版本控制系统（没有之一）。

* 代码仓库
仓库分本地仓库和远程仓库、要根据语境来理解，文章说的一般都是指本地仓库。

* 远程仓库
远程仓库是指托管在网络上的项目仓库，可能会有好多个，其中有些你只能读，另外有些可以写。
远程仓库会有一个连接地址，类似：https://git.sinacloud.com/wangxiaokuai 

* 跟踪
本地仓库跟踪远程仓库

* 仓库的分支
分支代表不同开发分支的代码，分支各种独立工作、过一段时间可以互相合并。

## （一）Git工作原理
若是理解了 Git 的思想和基本工作原理，用起来就会知其所以然，游刃有余。

### 直接记录文件快照，而非差异比较
Git 和其他版本控制系统的主要差别在于，Git 只关心文件数据的整体是否发生变化，而大多数其他系统则只关心文件内容的具体差异。

Git 更像是把变化的文件作快照后，记录在一个微型的文件系统中。每次提交更新时，它会纵览一遍所有文件的指纹信息并对文件作一快照，然后保存一个指向这次快照的索引。
为提高性能，若文件没有变化，Git 不会再次保存，而只对上次保存的快照作一链接。Git 的工作方式就像图 1-5 所示。


### Git中文件的三种状态
对于任何一个文件，在 Git 内都只有三种状态：
* 已修改（modified）—— 脏的是不是。。。
表示修改了某个文件，但还没有提交保存；
* 已暂存（staged）—— git add
表示把已修改的文件放在<mark>下次提交</mark>时要保存的清单中。
* 已提交（committed）—— git commit
表示该文件已经被安全地保存在<mark>本地</mark>数据库中了；

由此我们看到 Git 管理项目时，文件流转的三个工作区域：
* Git 的工作目录（已修改）
* 暂存区域（已暂存）
* 以及本地仓库（已提交）


### .git是Git保存元数据和对象的地方
每个项目都有一个 Git 目录（译注：如果 git clone 出来的话，就是其中 .git 的目录），它是 Git 用来保存元数据和对象数据库的地方。
该目录非常重要，每次克隆镜像仓库的时候，实际拷贝的就是这个目录里面的数据。

### 镜像仓库？？remote仓库？？

从项目中取出某个版本的所有文件和目录，用以开始后续工作的叫做工作目录。
这些文件实际上都是从 Git 目录中的压缩对象数据库中提取出来的，接下来就可以在工作目录中对这些文件进行编辑。

所谓的暂存区域只不过是个简单的文件，一般都放在 Git 目录中。有时候人们会把这个文件叫做索引文件，不过标准说法还是叫暂存区域。

### 基本的 Git 工作流程如下
* 在工作目录中修改某些文件。变为已修改状态（那原来的文件没了是吗。。）
* 对修改后的文件进行快照，然后保存到暂存区域。
* 提交更新，将保存在暂存区域的文件快照永久转储到 Git 目录中。

## （二）Git本地操作
读完本章，你就能（7）：
* 初始化一个新的代码仓库（本地的），做一些适当配置；
* 开始或停止跟踪某些文件；
* 暂存或提交某些更新

* 我们还会展示如何让 Git 忽略某些文件，或是名称符合特定模式的文件；
* 如何既快且容易地撤消犯下的小错误；
* 如何浏览项目的更新历史，查看某两次更新之间的差异；
* 以及如何从远程仓库拉数据下来或者推数据上去。

### Git有两种仓库：本地仓库和远程仓库

### 有两种取得 Git 项目仓库的方法。
* 第一种是在现存的目录下，通过导入所有文件来创建新的 Git 仓库（git init）
* 第二种是从已有的远端 Git 仓库克隆出一个新的镜像仓库来（git clone）

### git init 初始化本地仓库
要对现有的某个项目开始用 Git 管理，只需到此项目所在的目录，执行：
```
$ git init
```
初始化后，在当前目录下会出现一个名为 .git 的目录，所有 Git 需要的数据和资源都存放在这个目录中。

不过目前，仅仅是按照既有的结构框架初始化好了里边所有的文件和目录，但我们还没有开始跟踪管理项目中的任何一个文件。

### git add 将本地文件纳入版本控制
如果当前目录下有几个文件想要纳入版本控制，需要先用 git add 命令告诉 Git 开始对这些文件进行跟踪，然后提交：
```
$ git add *.c
$ git add README
$ git commit -m 'initial project version'
```
现在，你已经得到了一个实际维护着若干文件的 Git 仓库。

### git clone 克隆远程仓库
```
git clone [url]
```
如果想对某个开源项目出一份力，可以先把该项目的 远端Git 仓库复制一份出来，这就需要用到 git clone 命令。
Git 收取的是项目历史的所有数据（每一个文件的每一个版本），服务器上有的数据克隆之后本地也都有了。
实际上，即便服务器的磁盘发生故障，用任何一个克隆出来的客户端都可以重建服务器上的仓库，回到当初克隆时的状态。

示例：
```
$ git clone git://github.com/schacon/grit.git
```
* 这会在当前目录下创建一个名为grit的目录
* 其中包含一个 .git 的目录，用于保存下载下来的所有版本记录
* 然后从中取出最新版本的文件拷贝。

如果进入这个新建的 grit 目录，你会看到项目中的所有文件已经在里边了，准备好后续的开发和使用。如果希望在克隆的时候，自己定义要新建的项目目录名称，可以在上面的命令末尾指定新的名字：
```
$ git clone git://github.com/schacon/grit.git mygrit
```
唯一的差别就是，现在新建的目录成了 mygrit，其他的都和上边的一样。

### Git文件的上传下载、支持许多数据传输协议，在服务器端配置
之前的例子使用的是 git:// 协议，不过你也可以用 http(s):// 或者 user@server:/path.git 表示的 SSH 传输协议。
> 我们会在第四章详细介绍所有这些协议在<mark>服务器端</mark>该如何配置使用，以及各种方式之间的利弊。

### 记录每次更新到仓库（本地仓库）
现在我们手上已经有了一个真实项目的 Git 仓库，并从这个仓库中取出了所有文件的工作拷贝。
接下来，对这些文件作些修改，在完成了一个阶段的目标之后，提交本次更新到仓库。

请记住，工作目录下面的所有文件都不外乎这两种状态：已跟踪或未跟踪。
* 已跟踪的文件是指本来就被纳入版本控制管理的文件，在上次快照中有它们的记录，工作一段时间后，它们的状态可能是未更新，已修改或者已放入暂存区。
初次git clone某个仓库时，工作目录中的所有文件都属于已跟踪文件，且状态为未修改。
* 而所有其他文件都属于未跟踪文件。它们既没有上次更新时的快照，也不在当前的暂存区域

在编辑过某些文件之后，Git 将这些文件标为已修改。我们逐步把这些修改过的文件放到暂存区域，直到最后一次性提交所有这些暂存起来的文件，如此重复。所以使用 Git 时的文件状态变化周期如图 2-1 所示。


### git status 检查当前文件状态
如果在克隆仓库之后立即执行此命令，会看到类似这样的输出：
```
$ git status
# On branch master
nothing to commit (working directory clean)
```
这说明你现在的工作目录相当干净。换句话说，所有已跟踪文件在上次提交后都未被更改过。
此外，上面的信息还表明，当前目录下没有出现任何处于未跟踪的新文件，否则 Git 会在这里列出来。
> 最后，该命令还显示了当前所在的分支是 master，这是默认的分支名称

现在让我们用 vim 创建一个新文件 README，保存退出后运行 git status 会看到该文件出现在未跟踪文件列表中：
```
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   index.wsgi

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        readme.md
```
在状态报告中可以看到新建的README文件出现在“Untracked files”下面。

未跟踪的文件意味着Git在之前的快照（提交）中没有这些文件；
Git 不会自动将之纳入跟踪范围，除非你明明白白地告诉它“我需要跟踪该文件”，因而不用担心把临时文件什么的也归入版本管理。

不过现在的例子中，我们确实想要跟踪管理 README 这个文件。

### git add 跟踪新文件
所以要跟踪 README 文件，运行：
```
$ git add readme.md
```
再执行git status会发现：
```
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
        new file:   readme.md
```
只要在 “Changes to be committed” 这行下面的，就说明是已暂存状态。

如果此时提交，那么该文件此时此刻的版本将被留存在历史记录中。
你可能会想起之前我们使用 git init 后就运行了 git add 命令，开始跟踪当前目录下的文件。

在 git add 后面可以指明要跟踪的文件或目录路径。
如果是目录的话，就说明要递归跟踪该目录下的所有文件。（译注：其实 git add 的潜台词就是把目标文件快照放入暂存区域，也就是 add file into staged area，同时未曾跟踪过的文件标记为需要跟踪。这样就好理解后续 add 操作的实际意义了。）

### git add是个多功能的命令
这是个多功能命令，根据目标文件的状态不同，此命令的效果也不同：
* 可以用它开始跟踪新文件
* 或者把已跟踪的文件放到暂存区
* 还能用于合并时把有冲突的文件标记为已解决状态等

### 修改文件后，暂存已修改文件
现在我们修改下之前已跟踪过的文件 benchmarks.rb，然后再次运行 status 命令，会看到:文件 benchmarks.rb 出现在 “Changes not staged for commit” 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。

要暂存这次更新，需要运行 git add 命令。现在让我们运行 git add 将 benchmarks.rb 放到暂存区，然后再看看 git status 的输出...

现在两个文件都已暂存，下次提交时就会一并记录到仓库。假设此时，你想要在 benchmarks.rb 里再加条注释，重新编辑存盘后，准备好提交。不过且慢，再运行 git status 看看：...

怎么回事？ benchmarks.rb 文件出现了两次！一次算未暂存，一次算已暂存，这怎么可能呢？

### git commit只会提交已暂存的修改
好吧，实际上 Git 只不过暂存了你运行 git add 命令时的版本，如果现在提交，那么提交的是添加注释前的版本，而非当前工作目录中的版本。
所以，运行了 git add 之后又作了修订的文件，需要重新运行 git add 把最新版本重新暂存起来：

### 创建.gitignore文件，来忽略某些文件
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。
通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。
我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
```
$ cat .gitignore
    *.[oa]
    *~
```
* 第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。

* 第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。

* 此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

要养成一开始就设置好 .gitignore 文件的习惯，以免将来误提交这类无用的文件。

### 文件.gitignore 的格式规范如下：
* 所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。
* 可以使用标准的 glob 模式匹配。
* 匹配模式最后跟反斜杠（/）说明要忽略的是目录。
* 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。
* 所谓的 glob 模式是指 shell 
* 所使用的简化了的正则表达式（四种语法）
星号（*）匹配零个或多个任意字符；
[abc] 匹配任何一个列在方括号中的字符；
问号（?）只匹配一个任意字符；
如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如 [0-9] 表示匹配所有 0 到 9 的数字）。

我们再看一个 .gitignore 文件的例子：
```
# 忽略所有 .a 结尾的文件
*.a

# 但 lib.a 除外
!lib.a

# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO

# 忽略 build/ 目录下的所有文件
build/

# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt
```
### git diff 查看已暂存和未暂存的更新

实际上 git status 的显示比较简单，仅仅是列出了修改过的文件，如果要查看具体修改了什么地方，可以用 git diff 命令。

现在，它已经能回答我们的两个问题了：当前做的哪些更新还没有暂存？有哪些更新已经暂存起来准备好了下次提交？ 

git diff 会使用文件补丁的格式显示具体添加和删除的行。

假如再次修改 README 文件后暂存，然后编辑 benchmarks.rb 文件后先别暂存

要查看尚未暂存的文件更新了哪些部分，不加参数直接输入git diff：
```
$ git diff
    diff --git a/benchmarks.rb b/benchmarks.rb
    index 3cb747f..da65585 100644
    --- a/benchmarks.rb
    +++ b/benchmarks.rb
    @@ -36,6 +36,10 @@ def main
    @commit.parents[0].parents[0].parents[0]
    end

    + run_code(x, 'commits 1') do
    + git.commits.size
    + end
    +
    run_code(x, 'commits 2') do
    log = git.commits('master', 15)
    log.size
```


若要看已经暂存起来的文件和上次提交时的快照之间的差异，可以用 git diff --cached 命令。（或git diff --staged）

### git commit 提交更新

现在的暂存区域已经准备妥当可以提交了。在此之前，请一定要确认还有什么修改过的或新建的文件还没有 git add 过，否则提交的时候不会记录这些还没暂存起来的变化。

### 每次准备提交前，先git status 一下
所以，每次准备提交前，先用 git status 看下，是不是都已暂存起来了，然后再运行提交命令 git commit：
```
$ git commit
```
这种方式会启动文本编辑器以便输入本次提交的说明。
（默认会启用 shell 的环境变量 $EDITOR 所指定的软件，一般都是 vim 或 emacs。当然也可以按照第一章介绍的方式，使用 git config --global core.editor 命令设定你喜欢的编辑软件。）

编辑器会显示类似下面的文本信息（本例选用 Vim 的屏显方式展示）：
```
# Please enter the commit message for your changes. Lines starting
    # with '#' will be ignored, and an empty message aborts the commit.
    # On branch master
    # Changes to be committed:
    # (use "git reset HEAD <file>..." to unstage)
    #
    # new file: README
    # modified: benchmarks.rb
    ~
    ~
    ~
    ".git/COMMIT_EDITMSG" 10L, 283C
```
可以看到，默认的提交消息包含最后一次运行 git status 的输出，放在注释行里，另外开头还有一空行，供你输入提交说明。你完全可以去掉这些注释行，不过留着也没关系，多少能帮你回想起这次更新的内容有哪些。

（如果觉得这还不够，可以用 -v 选项将修改差异的每一行都包含到注释中来。）
退出编辑器时，Git 会丢掉注释行，将说明内容和本次更新提交到仓库。

### m 参数后跟提交说明的方式
另外也可以用 -m 参数后跟提交说明的方式，在一行命令中提交更新：
```
$ git commit -m "Story 182: Fix benchmarks for speed"
    [master]: created 463dc4f: "Fix benchmarks for speed"
    2 files changed, 3 insertions(+), 0 deletions(-)
    create mode 100644 README
```
好，现在你已经创建了第一个提交！
可以看到，提交后它会告诉你，当前是在哪个分支（master）提交的，本次提交的完整 SHA-1 校验和是什么（463dc4f），以及在本次提交中，有多少文件修订过，多少行添改和删改过。

### 每一次提交，都是对项目做一次快照
记住，提交时记录的是放在暂存区域的快照，任何还未暂存的仍然保持已修改状态，可以在下次提交时纳入版本管理。
每一次运行提交操作，都是对你项目作一次快照，以后可以回到这个状态，或者进行比较。

### 加上-a参数，跳过使用暂存区域

尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。Git 提供了一个跳过使用暂存区域的方式，只要在提交的时候，给 git commit 加上 -a 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤：
```
 $ git commit -a -m 'added new benchmarks'
    [master 83e38c7] added new benchmarks
    1 files changed, 5 insertions(+), 0 deletions(-)
```

### git rm移除文件
要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。

可以用 git rm 命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。

### 不能知识手动从工作目录删除文件
如果只是简单地从工作目录中手工删除文件，运行 git status 时就会在 “Changes not staged for commit” 部分（也就是未暂存清单）看到：
```
$ rm grit.gemspec
    $ git status
    # On branch master
    #
    # Changes not staged for commit:
    # (use "git add/rm <file>..." to update what will be committed)
    #
    # deleted: grit.gemspec
    #
```
然后再运行 git rm 记录此次移除文件的操作：
```
$ git rm grit.gemspec
    rm 'grit.gemspec'
    $ git status
    # On branch master
    #
    # Changes to be committed:
    # (use "git reset HEAD <file>..." to unstage)
    #
    # deleted: grit.gemspec
    #
```

最后提交的时候，该文件就不再纳入版本管理了。
如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 -f，以防误删除文件后丢失修改的内容。

另外一种情况是，我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。换句话说，仅是从跟踪清单中删除。比如一些大型日志文件或者一堆 .a 编译文件，不小心纳入仓库后，要移除跟踪但不删除文件，以便稍后在 .gitignore 文件中补上，用 --cached 选项即可：

$ git rm --cached readme.txt
后面可以列出文件或者目录的名字，也可以使用 glob 模式。比方说：

$ git rm log/\*.log
注意到星号 * 之前的反斜杠 \，因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开（译注：实际上不加反斜杠也可以运行，只不过按照 shell 扩展的话，仅仅删除指定目录下的文件而不会递归匹配。上面的例子本来就指定了目录，所以效果等同，但下面的例子就会用递归方式匹配，所以必须加反斜杠。）。此命令删除所有 log/ 目录下扩展名为 .log 的文件。类似的比如：

$ git rm \*~
会递归删除当前目录及其子目录中所有 ~ 结尾的文件。

### 移动文件
如果在 Git 中重命名了某个文件，仓库中存储的元数据并不会体现出这是一次改名操作。
不过 Git 非常聪明，它会推断出究竟发生了什么。

既然如此，当你看到 Git 的 mv 命令时一定会困惑不已。要在 Git 中对文件改名，可以这么做：
```
$ git mv file_from file_to
```
它会恰如预期般正常工作。实际上，即便此时查看状态信息，也会明白无误地看到关于重命名操作的说明：

$ git mv README.txt README
    $ git status
    # On branch master
    # Your branch is ahead of 'origin/master' by 1 commit.
    #
    # Changes to be committed:
    # (use "git reset HEAD <file>..." to unstage)
    #
    # renamed: README.txt -> README
    #
其实，运行 git mv 就相当于运行了下面三条命令：
```
$ mv README.txt README
    $ git rm README.txt
    $ git add README
```    
如此分开操作，Git 也会意识到这是一次改名，所以不管何种方式都一样。当然，直接用 git mv 轻便得多，不过有时候用其他工具批处理改名的话，要记得在提交前删除老的文件名，再添加新的文件名。

### 查看提交历史（略）

### 撤消操作
任何时候，你都有可能需要撤消刚才所做的某些操作。接下来，我们会介绍一些基本的撤消操作相关的命令。请注意，有些撤销操作是不可逆的，所以请务必谨慎小心，一旦失误，就有可能丢失部分工作成果。

#### git commit --amend 修改最后一次提交
有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要撤消刚才的提交操作，可以使用 --amend 选项重新提交：
```
$ git commit --amend
```
此命令将使用当前的暂存区域快照提交。如果刚才提交完没有作任何改动，直接运行此命令的话，相当于有机会重新编辑提交说明，但将要提交的文件快照和之前的一样。

启动文本编辑器后，会看到上次提交时的说明，编辑它确认没问题后保存退出，就会使用新的提交说明覆盖刚才失误的提交。

如果刚才提交时忘了暂存某些修改，可以先补上暂存操作，然后再运行 --amend 提交：
```
$ git commit -m 'initial commit'
    $ git add forgotten_file
    $ git commit --amend
```    
上面的三条命令最终只是产生一个提交，第二个提交命令修正了第一个的提交内容。

#### git reset HEAD 取消已经暂存的文件

不用担心，查看文件状态的时候就提示了该如何撤消，所以不需要死记硬背。
来看下面的例子，有两个修改过的文件，我们想要分开提交，但不小心用 git add . 全加到了暂存区域。该如何撤消暂存其中的一个文件呢？其实，git status 的命令输出已经告诉了我们该怎么做：
```
$ git add .
    $ git status
    # On branch master
    # Changes to be committed:
    # (use "git reset HEAD <file>..." to unstage)
    #
    # modified: README.txt
    # modified: benchmarks.rb
    #
```

就在 “Changes to be committed” 下面，括号中有提示，可以使用 git reset HEAD <file>... 的方式取消暂存。好吧，我们来试试取消暂存 benchmarks.rb 文件：

```
$ git reset HEAD benchmarks.rb
    benchmarks.rb: locally modified
    $ git status
    # On branch master
    # Changes to be committed:
    # (use "git reset HEAD <file>..." to unstage)
    #
    # modified: README.txt
    #
    # Changes not staged for commit:
    # (use "git add <file>..." to update what will be committed)
    # (use "git checkout -- <file>..." to discard changes in working directory)
    #
    # modified: benchmarks.rb
    #
```    
这条命令看起来有些古怪，先别管，能用就行。
现在 benchmarks.rb 文件又回到了之前已修改未暂存的状态。

### git checkout 取消对文件的修改
如果觉得刚才对 benchmarks.rb 的修改完全没有必要，该如何回到修改之前的版本呢？
git status 同样提示了具体的撤消方法，接着上面的例子，现在未暂存区域看起来像这样：
```
# Changes not staged for commit:
    # (use "git add <file>..." to update what will be committed)
    # (use "git checkout -- <file>..." to discard changes in working directory)
    #
    # modified: benchmarks.rb
    #
```

在第二个括号中，我们看到了抛弃文件修改的命令，让我们试试看：
```
$ git checkout -- benchmarks.rb
    $ git status
    # On branch master
    # Changes to be committed:
    # (use "git reset HEAD <file>..." to unstage)
    #
    # modified: README.txt
    #
```    
可以看到，该文件已经恢复到修改前的版本。
你可能已经意识到了，这条命令有些危险，所有对文件的修改都没有了，因为我们刚刚把之前版本的文件复制过来重写了此文件。

所以在用这条命令前，请务必确定真的不再需要保留刚才的修改。

如果只是想回退版本，同时保留刚才的修改以便将来继续工作，可以用下章介绍的 stashing 和分支来处理，应该会更好些。

### 记住，任何已经提交到 Git 的都可以被恢复
记住，任何已经提交到 Git 的都可以被恢复。即便在已经删除的分支中的提交，或者用 --amend 重新改写的提交，都可以被恢复（关于数据恢复的内容见第九章）。

### 你可能失去的数据，仅限于没有提交过的
所以，你可能失去的数据，仅限于没有提交过的，对 Git 来说它们就像从未存在过一样。

## （三）Git远程仓库的使用
要参与任何一个 Git 项目的协作，必须要了解该如何管理远程仓库。
远端仓库是用url访问的。

### 远程仓库的链接
远程仓库支持多种协议，所以远程仓库的Url有好几种样子：
```
git://github.com/paulboone/ticgit.git
origin  https://github.com/wangxiaokuai/Python-WebServer-on-SAE.git (fetch)
origin  https://github.com/wangxiaokuai/Python-WebServer-on-SAE.git (push)
sae     https://git.sinacloud.com/wangxiaokuai (fetch)
sae     https://git.sinacloud.com/wangxiaokuai (push)
origin git://github.com/schacon/ticgit.git
```

### 远端仓库的shortname
通常在本地频繁使用remote仓库时，他们会用git remote add命令来给远端仓库指定一个shortname

### push和pull数据
同他人协作开发某个项目时，需要管理这些远程仓库，以便推送或拉取数据，分享各自的工作进展。

### 远程仓库的操作（4）
* 添加远程库
* 移除废弃的远程库
* 管理各式远程库分支
* 定义是否跟踪这些分支，等等。

### git remote查看当前的远程库
要查看当前配置有哪些远程仓库，可以用 git remote 命令，
它会列出每个远程库的shortname。
```
git remote
```
也可以加上 -v 选项（译注：此为 --verbose 的简写，取首字母），显示对应的克隆地址：
```
git remote -v
```
这样一来，我就可以非常轻松地从这些用户的仓库中，拉取他们的提交到本地；但由于权限的问题、不一定能push数据。
```
$ git remote -v
bakkdoor git://github.com/bakkdoor/grit.git
origin git@github.com:mojombo/grit.git
```

### git clone创建本地仓库，并跟踪remote仓库（用于第一次下载数据）
默认情况下 git clone 命令本质上就是自动创建了本地的 master 分支，用于跟踪远程仓库中的 master 分支
在克隆完某个项目后，至少可以看到一个名为 origin 的远程库，Git 默认使用这个名字来标识你所克隆的原始仓库

<mark>origin只是remote仓库的一个shortname而已。</mark>

### git remote add给远程仓库一个shortname
添加远程仓库
要添加一个新的远程仓库，可以指定一个简单的名字，以便将来引用，运行:
```
git remote add [shortname] [url]：
```
例如：
```
$ git remote add pb git://github.com/paulboone/ticgit.git
$ git remote -v
origin git://github.com/schacon/ticgit.git
pb git://github.com/paulboone/ticgit.git
```
现在可以用字符串 pb 指代对应的仓库地址了。

### git fetch 从远程仓库抓取数据
``` 
$ git fetch [remote-name] 
```

比如说，要抓取所有 Paul 有的，但本地仓库没有的信息，可以运行:
``` 
git fetch pb
```
现在，Paul 的主干分支（master）已经完全可以在本地访问了，对应的名字是 pb/master

此命令会到远程仓库中拉取所有你本地仓库中还没有的数据。
运行完成后，你就可以在本地访问该远程仓库中的所有分支。

如果是克隆了一个仓库，此命令会自动将远程仓库归于 origin 名下。
所以，git fetch origin 会抓取从你上次克隆以来别人上传到此远程仓库中的所有更新（或是上次 fetch 以来别人提交的更新）。

### fetch不会将remote代码自动合并到本地代码（用于更新数据）??
fetch 命令只是将远端的数据拉到本地仓库，并不自动合并到当前工作分支，只有当你确实准备好了，才能手工合并。

### git pull会自动合并remote代码到本地（用于更新数据）
如果设置了某个分支用于跟踪某个远端仓库的分支，可以使用 git pull 命令自动抓取数据下来，然后将远端分支自动合并到本地仓库中当前分支。在日常工作中我们经常这么用，既快且好。

所以一般我们运行 git pull，目的都是要从原始克隆的远端仓库中抓取数据后，合并到工作目录中的当前分支。

### git push推送数据到远程仓库
```
git push [remote-name] [branch-name]
```
项目进行到一个阶段，要同别人分享目前的成果，可以将本地仓库中的数据推送到远程仓库。 

如果要把本地的 master 分支推送到 origin 服务器上（再次说明下，克隆操作会自动使用默认的 master 和 origin 名字），可以运行下面的命令：
```
$ git push origin master
```

### 推送数据要有两个条件
只有在所克隆的服务器上有写权限，并且同一时刻没有其他人在推数据，这条命令才会如期完成任务。
如果在你推数据前，已经有其他人推送了若干更新，那你的推送操作就会被驳回。

### 先fetch，再push
你必须先把他们的更新抓取到本地，合并到自己的项目中，然后才可以再次推送。
有关推送数据到远程仓库的详细内容见第三章。

### git remote show查看远程仓库详细信息
```
git remote show [remote-name] 
```

例如：(虽然不懂啥意思。。)
```
$ git remote show sae
* remote sae
  Fetch URL: https://git.sinacloud.com/wangxiaokuai
  Push  URL: https://git.sinacloud.com/wangxiaokuai
  HEAD branch: 1
  Remote branches:
    1 new (next fetch will store in remotes/sae)
    2 tracked
```
除了对应的克隆地址外，它还给出了许多额外的信息。
它友善地告诉你如果是在 master 分支，就可以用 git pull 命令抓取数据合并到本地。
另外还列出了所有处于跟踪状态中的远端分支。

上面的例子非常简单，而随着使用 Git 的深入，git remote show 给出的信息可能会像这样：
```
$ git remote show origin
    * remote origin
    URL: git@github.com:defunkt/github.git
    Remote branch merged with 'git pull' while on branch issues
    issues
    Remote branch merged with 'git pull' while on branch master
    master
    New remote branches (next fetch will store in remotes/origin)
    caching
    Stale tracking branches (use 'git remote prune')
    libwalker
    walker2
    Tracked remote branches
    acl
    apiv2
    dashboard2
    issues
    master
    postgres
    Local branch pushed with 'git push'
    master:master
```
这个remote仓库，有好多个分支。。。

它告诉我们，运行 git push 时缺省推送的分支是什么（译注：最后两行）。
它还显示了有哪些远端分支还没有同步到本地（译注：第六行的 caching 分支）
哪些已同步到本地的远端分支在远端服务器上已被删除（译注：Stale tracking branches 下面的两个分支）
以及运行 git pull 时将自动合并哪些分支（译注：前四行中列出的 issues 和 master 分支）。

### git remote rename 修改远程仓库的shortname
```
git remote rename
```
比如想把 pb 改成 paul，可以这么运行：
```
git remote rename pb paul
```
注意，对远程仓库的重命名，也会使对应的分支名称发生变化，原来的 pb/master 分支现在成了 paul/master。

### git remote rm  删除远端仓库
碰到远端仓库服务器迁移，或者原来的克隆镜像不再使用，又或者某个参与者不再贡献代码，那么需要移除对应的远端仓库，可以运行 git remote rm 命令：
```
$ git remote rm paul
```

## （四）Git 分支[初步]
使用分支意味着你可以从开发主线上分离开来，然后在不影响主线的同时继续工作。

### Git的分支管理非常高效
理解分支的概念并熟练运用后，你才会意识到为什么 Git 是一个如此强大而独特的工具，并从此真正改变你的开发方式。而在很多版本控制系统中，这是个昂贵的过程，常常需要创建一个源代码目录的完整副本，对大型项目来说会花费很长时间。

### 何谓分支
回顾一下，Git 保存的不是文件差异或者变化量，而只是一系列文件快照。

### 提交（commit）对象
在 Git 中提交时，会保存一个提交（commit）对象，该对象：
* 包含一个指向暂存内容快照的指针
* 包含本次提交的作者等相关附属信息
* 包含零个或多个指向该提交对象的父对象指针：
	* 首次提交是没有直接祖先的
	* 普通提交有一个祖先
	* 由两个或多个分支合并产生的提交则有多个祖先。

为直观起见，我们假设在工作目录中有三个文件，准备将它们暂存后提交。
暂存操作会对每一个文件计算校验和（即第一章中提到的 SHA-1 哈希字串），
然后把当前版本的文件快照保存到 Git 仓库中（Git 使用 blob 类型的对象存储这些快照）
并将校验和加入暂存区域：
```
$ git add README test.rb LICENSE
$ git commit -m 'initial commit of my project'
```

当使用 git commit 新建一个提交对象前，Git 会先计算每一个子目录（本例中就是项目根目录）的校验和，然后在 Git 仓库中将这些目录保存为树（tree）对象。之后 Git 创建的提交对象，除了包含相关提交信息以外，还包含着指向这个树对象（项目根目录）的指针，如此它就可以在将来需要的时候，重现此次快照的内容了。

现在，Git 仓库中有五个对象：
* 三个表示文件快照内容的 blob 对象；
* 一个记录着目录树内容及其中各个文件对应 blob 对象索引的 tree 对象；
* 以及一个包含指向 tree 对象（根目录）的索引和其他提交信息元数据的 commit 对象。

概念上来说，仓库中的各个对象保存的数据和相互关系看起来如图 3-1 所示：



作些修改后再次提交，那么这次的提交对象会包含一个指向上次提交对象的指针（译注：即下图中的 parent 对象）。两次提交后，仓库历史会变成图 3-2 的样子：

### Git分支怎样产生的
Git 中的分支，其实本质上仅仅是个指向 commit 对象的可变指针。
Git 会使用 master 作为分支的默认名字。在若干次提交后，你其实已经有了一个指向最后一次提交对象的 master 分支，它在每次提交的时候都会自动向前移动。



那么，Git 又是如何创建一个新的分支的呢？答案很简单，创建一个新的分支指针。比如新建一个 testing 分支，可以使用 git branch 命令：
```
$ git branch testing
```
这会在当前 commit 对象上新建一个分支指针（见图 3-4）。



### Git 如何知道你在哪个分支上工作？
其实答案也很简单，它保存着一个名为 HEAD 的特别指针。

在 Git 中，它是一个指向你正在工作中的本地分支的指针（译注：将 HEAD 想象为当前分支的别名。）。

### git branch不会自动切换到新分支
运行 git branch 命令，仅仅是建立了一个新的分支，但不会自动切换到这个分支中去，所以在这个例子中，我们依然还在 master 分支里工作。

### git checkout 切换到其他分支
要切换到其他分支，可以执行 git checkout 命令。我们现在转换到新建的 testing 分支：

### 于是，可以在不同分支来回切换工作
现在我们的项目提交历史产生了分叉（如图 3-9 所示），因为刚才我们创建了一个分支，转换到其中进行了一些工作，然后又回到原来的主分支进行了另外一些工作。

这些改变分别孤立在不同的分支里：我们可以在不同分支里反复切换，并在时机成熟时把它们合并到一起。而所有这些工作，仅仅需要 branch 和 checkout 这两条命令就可以完成。

> 接下来看看，我们为什么应该频繁使用分支。（略）

### git branch 列出所有分支
```
$ git branch
* master
```

## （五）Git客户端使用

### 初次运行 Git 前的配置
一般在新的系统上，我们都需要先配置下自己的 Git 工作环境。

Git 提供了一个叫做 git config 的工具（译注：实际是 git-config 命令，只不过可以通过 git 加一个名字来呼叫此命令。）
专门用来配置或读取相应的工作环境变量。

而正是由这些环境变量，决定了 Git 在各个环节的具体工作方式和行为。

### Git配置文件的位置（3）
* /etc/gitconfig 文件：
系统中对所有用户都普遍适用的配置。
若使用 git config 时用 --system 选项，读写的就是这个文件。

* ~/.gitconfig 文件：用户目录下的配置文件只适用于该用户。
若使用 git config 时用 --global 选项，读写的就是这个文件。

* 工作目录中的 .git/config 文件
也就是当前项目的 git 目录中的配置文件这里的配置仅仅针对当前项目有效。
每一个级别的配置都会覆盖上层的相同配置，所以 .git/config 里的配置会覆盖 /etc/gitconfig 中的同名变量。

### Windows主目录，即$HOME
在 Windows 系统上，Git 会找寻用户主目录下的 .gitconfig 文件。
主目录即 $HOME 变量指定的目录，一般都是 <mark>C:\Documents and Settings\$USER</mark>。

此外，Git 还会尝试找寻 /etc/gitconfig 文件，只不过看当初 Git 装在什么目录，就以此作为根目录来定位。

（后面的略了）

### 常用命令
```
$ git add index.wsgi
$ git commit -m "initial commit"
$ git push sae master:1

$ git pull sae master:1    
```

在你本地的git代码目录里，添加一个新的git远程仓库 sae：
```
mkdir git001
cd git001
git init
git remote add sae https://git.sinacloud.com/wangxiaokuai
```

编辑代码并将代码部署到 `sae` 的版本1。
```
$ git add .
$ git commit -am "make it better"
$ git push sae master:1  		# 然后输管理员口令
```

### push免输密码设置方法
```
git config --global credential.helper store
```

执行后.gitconfig文件，会多了一项：
```
[credential]
    helper = store
```

重新开启git bash，git push然后输入用户名密码；会发现git push时不用再输入用户名和密码
注：.gitconfig文件的同级目录下，会出现一个.git-credentials文件，里面记录了你的用户名密码。是明文。

### git help 获取帮助 
想了解 Git 的各式工具该怎么用，可以阅读它们的使用帮助。网页版的帮助手册，英文、非常详细。
```
$ git help <verb>
$ git <verb> --help
```

## 关于分支版本？？（待续）

## 关于服务器上的Git（待续）






