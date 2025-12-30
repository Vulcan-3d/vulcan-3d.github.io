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
            "affiliations": ["3"],
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
            "affiliations": ["3", "4"],
            "footnote": [""]
        },
        {
            "name": "Sanghyun Woo",
            "email": "https://sites.google.com/corp/view/sanghyunwoo/",
            "affiliations": ["3"],
            "footnote": [""]
        }
    ],
    "affiliations": ["Stanford University", "Google", "Google DeepMind", "New York University"],
    "footnote": [],
    "URLs": {
        "paper": "https://arxiv.org/pdf/2512.22351",
        "arxiv": "https://arxiv.org/abs/2512.22351"
    },
    "abstract": "Despite the remarkable progress of Multimodal Large Language Models (MLLMs) in 2D vision-language tasks, their application to complex 3D scene manipulation remains underexplored. In this paper, we bridge this critical gap by tackling three key challenges in 3D object arrangement task using MLLMs. First, to address the weak visual grounding of MLLMs, which struggle to link programmatic edits with precise 3D outcomes, we introduce an MCP-based API. This shifts the interaction from brittle raw code manipulation to more robust, function-level updates. Second, we augment the MLLM's 3D scene understanding with a suite of specialized visual tools to analyze scene state, gather spatial information, and validate action outcomes. This perceptual feedback loop is critical for closing the gap between language-based updates and precise 3D-aware manipulation. Third, to manage the iterative, error-prone updates, we propose a collaborative multi-agent framework with designated roles for planning, execution, and verification. This decomposition allows the system to robustly handle multi-step instructions and recover from intermediate errors. We demonstrate the effectiveness of our approach on a diverse set of 25 complex object arrangement tasks, where it significantly outperforms existing baselines."
})

// make_site({
//     "title": "Collaborative Video Diffusion: Consistent Multi-video Generation with Camera Control",
//     // "conference": "CVPR 2024",
//     "authors": [
//         {
//             "name": "Zhengfei Kuang",
//             "email": "https://zhengfeikuang.com/",
//             "affiliations": ["1"],
//             "footnote": ["*"]
//         },
//         {
//             "name": "Shengqu Cai",
//             "email": "https://primecai.github.io/",
//             "affiliations": ["1"],
//             "footnote": ["*"]
//         },
//         {
//             "name": "Hao He",
//             "email": "https://hehao13.github.io/",
//             "affiliations": ["2"],
//             "footnote": [""]
//         },
//         {
//             "name": "Yinghao Xu",
//             "email": "https://justimyhxu.github.io/",
//             "affiliations": ["1"],
//             "footnote": [""]
//         },
//         {
//             "name": "Hongsheng Li",
//             "email": "https://www.ee.cuhk.edu.hk/~hsli/",
//             "affiliations": ["2"],
//             "footnote": [""]
//         },
//         {
//             "name": "Leonidas Guibas",
//             "email": "https://geometry.stanford.edu/member/guibas/",
//             "affiliations": ["1"],
//             "footnote": [""]
//         },
//         {
//             "name": "Gordon Wetzstein",
//             "email": "https://stanford.edu/~gordonwz/",
//             "affiliations": ["1"],
//             "footnote": [""]
//         }
//     ],
//     "affiliations": ["Stanford University", "CUHK"],
//     "footnote": ["equal contribution"],
//     "URLs": {
//         "paper": "https://collaborativevideodiffusion.github.io/assets/pdfs/paper.pdf",
//         "arxiv": "https://arxiv.org/abs/2405.17414"
//     },
//     "abstract": "Research on video generation has recently made tremendous progress, enabling high-quality videos to be generated from text prompts or images. Adding control to the video generation process is an important goal moving forward and recent approaches that condition video generation models on camera trajectories make strides towards it. Yet, it remains challenging to generate a video of the same scene from multiple different camera trajectories. Solutions to this multi-video generation problem could enable large-scale 3D scene generation with editable camera trajectories, among other applications. We introduce collaborative video diffusion (CVD) as an important step towards this vision. The CVD framework includes a novel cross-video synchronization module that promotes consistency between corresponding frames of the same video rendered from different camera poses using an epipolar attention mechanism. Trained on top of a state-of-the-art camera-control module for video generation, CVD generates multiple videos rendered from different camera trajectories with significantly better consistency than baselines, as shown in extensive experiments."
// })
//fetch("./paper.json").then(response => response.json).then(json => make_site(json));
