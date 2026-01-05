get = id => document.getElementById(id);

function author_node(author) {
    var span = document.createElement("span");
    var a = document.createElement("a");
    var sup = document.createElement("sup");
    a.textContent = author.name;
    a.href = author.email;
    sup.textContent = author.footnote.map(String).join(",");
    sup.textContent += author.affiliations.map(String).join(",");
    span.appendChild(a);
    span.appendChild(sup);
    return span
}

function affiliations_node(affiliations) {
    var span = document.createElement("span");
    span.innerHTML = affiliations.map((affiliation, index) => 
        "<sup>" + (index + 1).toString() + "</sup>" + affiliation
    ).join(", ");
    return span
}

function footnote_node(footnotes) {
    var span = document.createElement("span");
    span.innerHTML = footnotes.map((footnote, index) => 
        "<sup>" + (index) + "</sup>" + footnote
    ).join(", ");
    return span
}

function copy_bibtex() {
    var range = document.createRange();
    range.selectNode(get("bibtex"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}


function make_site(paper){
    document.title = paper.title;
    get("title").textContent = paper.title;
    get("conference").textContent = paper.conference;
    paper.authors.map((author, index) => {
        node = author_node(author);
        get("author-list").appendChild(node);
        if(index == paper.authors.length - 1) return;
        node.innerHTML += ", "
    })
    get("affiliation-list").appendChild(affiliations_node(paper.affiliations));
    //get("footnote-list").appendChild(footnote_node(paper.footnote));
    //get("abstract").textContent = paper.abstract;
    for(var button in paper.URLs) {
        node = get(button);
        url = paper.URLs[button];
        if(url == null) node.remove();
        else node.href = url;
    }
    //get("video").src = paper.URLs.youtube.replace('.be','be.com/embed/');
    get("copy-button").onclick = copy_bibtex;
}

function set_slider(root) {
    const slidesContainer = root.querySelector(".slides-container");
    const slide = root.querySelector(".slide");
    const prevButton = root.querySelector(".slide-arrow-prev");
    const nextButton = root.querySelector(".slide-arrow-next");
    nextButton.addEventListener("click", (event) => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft += slideWidth;
    });
    prevButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
    });
}
sliders = document.getElementsByClassName("slider-wrapper")
for (var i = 0; i < sliders.length; i++) set_slider(sliders[i])

// Read JSON
make_site({
    "title": "VULCAN: Tool-Augmented Multi Agents for Iterative 3D Object Arrangement",
    "authors": [
        {
            "name": "Zhengfei Kuang",
            "email": "https://zhengfeikuang.com/",
            "affiliations": ["1"],
            "footnote": [""]
        },
        {
            "name": "Rui Lin",
            "email": "mailto:linrui@google.com",
            "affiliations": ["2"],
            "footnote": [""]
        },
        {
            "name": "Long Zhao",
            "email": "https://garyzhao.github.io/",
            "affiliations": ["2"],
            "footnote": [""]
        },
        {
            "name": "Gordon Wetzstein",
            "email": "https://stanford.edu/~gordonwz/",
            "affiliations": ["1"],
            "footnote": [""]
        },
        {
            "name": "Saining Xie",
            "email": "https://www.sainingxie.com/",
            "affiliations": ["2", "3"],
            "footnote": [""]
        },
        {
            "name": "Sanghyun Woo",
            "email": "https://sites.google.com/corp/view/sanghyunwoo/",
            "affiliations": ["2"],
            "footnote": [""]
        }
    ],
    "affiliations": ["Stanford University", "Google", "New York University"],
    "footnote": [],
    "URLs": {
        "paper": "https://arxiv.org/pdf/2512.22351",
        "arxiv": "https://arxiv.org/abs/2512.22351"
    },
    "abstract": "Despite the remarkable progress of Multimodal Large Language Models (MLLMs) in 2D vision-language tasks, their application to complex 3D scene manipulation remains underexplored. In this paper, we bridge this critical gap by tackling three key challenges in 3D object arrangement task using MLLMs. First, to address the weak visual grounding of MLLMs, which struggle to link programmatic edits with precise 3D outcomes, we introduce an MCP-based API. This shifts the interaction from brittle raw code manipulation to more robust, function-level updates. Second, we augment the MLLM's 3D scene understanding with a suite of specialized visual tools to analyze scene state, gather spatial information, and validate action outcomes. This perceptual feedback loop is critical for closing the gap between language-based updates and precise 3D-aware manipulation. Third, to manage the iterative, error-prone updates, we propose a collaborative multi-agent framework with designated roles for planning, execution, and verification. This decomposition allows the system to robustly handle multi-step instructions and recover from intermediate errors. We demonstrate the effectiveness of our approach on a diverse set of 25 complex object arrangement tasks, where it significantly outperforms existing baselines."
})
