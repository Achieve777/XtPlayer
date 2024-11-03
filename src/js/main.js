const core = require('./XtPlayer');

//挂载到window对象
window.XtPlayer = core;

const allSponsors = await fetchSponsorsMarkdown();

README_FILE_PATHS.forEach(filePath => {

    // read readme file
    const readme = readFileSync(filePath, "utf8");

    let newReadme = readme.replace(
        /<!--sponsorsstart-->[\w\W]*?<!--sponsorsend-->/u,
        `<!--sponsorsstart-->\n${allSponsors}\n<!--sponsorsend-->`
    );

    // replace multiple consecutive blank lines with just one blank line
    newReadme = newReadme.replace(/(?<=^|\n)\n{2,}/gu, "\n");

    // output to the files
    writeFileSync(filePath, newReadme, "utf8");
});
