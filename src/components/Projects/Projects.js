import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Caret from "../Caret/Caret";
import PostIt from "../PostIt/PostIt";
import "./Projects.scss";

const validCommands = [
  "ls",
  "cat about-me.txt",
  "cat work-experiences.txt",
  "cat contact-me.txt",
  "cat my-projects.txt",
  "clear",
];
function toValidJsonKey(str) {
  if (/^\d+$/.test(str)) {
    return String(str);
  }

  return str
    .toString()
    .normalize("NFKD") // Normalize accents
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-zA-Z0-9_$]/g, "_") // Replace invalid chars with _
    .replace(/^[^a-zA-Z_$]+/, "") // Remove invalid starting chars
    .replace(/_{2,}/g, "_") // Collapse multiple underscores
    .replace(/^_+|_+$/g, ""); // Trim underscores from ends
}

function Projects() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pastCommands, setPastCommands] = useState(["ls"]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [commandObjectState, setCommandObjectState] = useState({
    [toValidJsonKey("ls")]: {
      content: [
        "about-me.txt",
        "work-experiences.txt",
        "contact-me.txt",
        "RESUME",
        "my-projects.txt",
      ],
      gridLength: 4,
      class: ["animate0", "animate1", "animate2", "animate3", "animate4"],
    },
    [toValidJsonKey("cat about-me.txt")]: {
      content: [
        "Hi! My name is Leo and I'm a software engineer who's passionate about technology and ",
        "building software.",
        "I have over 5 years of experience working with web technology. ",
        "I am a full stack developer, but my expertise lies within building scalable automation ",
        "services using cutting edge tools & cloud technologies. ",
        "Outside of work, I enjoy working on cars, riding motorcycles, playing fps shooter games, ",
        "snowboarding, and sightseeing. ",
        "For my next role, I am looking to work with a small collaborative team in order to gain ",
        "more hands on experience with cloud technologies such as AWS or Azure and with building ",
        "infrastructure for large scale web applications. ",
      ],
      gridLength: 12,
      class: [
        "animate0",
        "animate1",
        "animate2",
        "animate3",
        "animate4",
        "animate5",
        "animate6",
        "animate7",
        "animate8",
        "animate9",
      ],
    },
    [toValidJsonKey("cat work-experiences.txt")]: {
      content: [
        [
          "Walmart Global Tech - SDET - Nov 2023 – Current",
          {
            line1: [
              "Created and executed manual & automation tests, conducted periodic ",
              "measurement analysis. Delivered, and communicated test results. ",
            ],
            line2: [
              "Designed and implemented functional and end-to-end tests working at UI, API ",
              "and database levels. ",
            ],
            line3: [
              "Contributed to planning and estimation activities, including monitoring processes and ",
              "reviewing QA deliverables and tasks. ",
            ],
          },
        ],
        [
          "Visa - Sr. Software Test Engineer - April 2022 – August 2023",
          {
            line1: [
              "Created & executed test plans, test designs & test cases covering feature ",
              "integration, regression, and system level testing. ",
            ],
            line2: [
              "Contributed to API & UI functional automation frameworks using industry wide tools ",
              "and performed database testing on RDMBS & NoSQL based databases. ",
            ],
            line3:
              "Helped debug Linux/Unix/Container based application servers in Docker/Kubernetes. ",
          },
        ],
        [
          "Extron Electronics - Automation Engineer - Nov 2020 – Nov 2021",
          {
            line1:
              "Developed a software support dashboard used to execute 10,000 accessibility tests.",
            line2:
              "Created & configured a HAPROXY load balancer for network distribution.",
            line3:
              "Created & configured an Application Portal (layer 7) load balancer for Azure VMs.",
            line4:
              "Created scripts to automate database migrations and deployment cleanups. ",
            line5:
              "Created multiple accessibility microservices with over 500 downloads on docker hub.",
            line6:
              "Provided guidance to team members with strategies to help improve code optimization.",
          },
        ],
        [
          "Glidewell Dental Labs - QA Automation Engineer - Apr 2018 – Apr 2020",
          {
            line1:
              "Designed and built an automation framework used to test both UIs and services. ",
            line2: [
              "Set up CI/CD pipelines using Jenkins, Docker & AWS to automate the execution of ",
              "test builds. ",
            ],
            line3:
              "Developed a software support tool used to run selenium tests and restart services. ",
          },
        ],
        [
          "Software Engineer - DiagnosisAI - Feb 2017 - Oct 2018",
          {
            line1:
              "Contributed to the development effort of an automated doctor to patient service. ",
            line2:
              "Contributed to the development effort of the company's landing page. ",
          },
        ],
        [
          "Sony Pictures Entertainment - Automation Analyst - Sep 2017 – Apr 2018",
          {
            line1:
              "Contributed to the development effort of a Java/Python automation framework. ",
            line2: [
              "Developed automation tests for web apps, REST APIs, thick clients, and ",
              "other applications. ",
            ],
            line3: [
              "Collaborated with offshore developers for requirements gathering & framework ",
              "development. ",
            ],
          },
        ],
      ],
      gridLength: 12,
      class: [
        "animate0",
        "animate1",
        "animate2",
        "animate3",
        "animate4",
        "animate5",
        "animate6",
        "animate7",
        "animate8",
        "animate9",
        "animate10",
        "animate11",
        "animate12",
        "animate13",
        "animate14",
        "animate15",
        "animate16",
        "animate17",
        "animate18",
        "animate19",
        "animate20",
        "animate21",
        "animate22",
        "animate23",
        "animate24",
        "animate25",
        "animate26",
        "animate27",
        "animate28",
        "animate29",
        "animate30",
      ],
    },
    [toValidJsonKey("cat my-projects.txt")]: {
      content: [
        {
          name: "Auto Apply (Auto Apply to Jobs on LinkedIn)",
          link: "https://github.com/yuxli066/HashiramaSenju",
        },
        {
          name: "Del Rosa Massage (https://delrosamassage.co)",
          link: "https://delrosamassage.co",
        },
        {
          name: "Mom's Recipe Book (https://asianmomrecipes.com)",
          link: "https://asianmomrecipes.com/",
        },
        {
          name: "Bunny Battler",
          link: "https://github.com/yuxli066/DanzoShimura",
        },
        {
          name: "Clueless",
          link: "https://github.com/yuxli066/Clueless",
        },
        {
          name: "Stoxbot",
          link: "https://github.com/yuxli066/stoxbot",
        },
        {
          name: "IdentifyAI",
          link: "https://x.com/identifyai",
        },
        {
          name: "Twitter Sentiment Analyzer",
          link: "https://github.com/yuxli066/TwitterSentimentAnalyzer",
        },
        {
          name: "RC Auto Car",
          link: "https://github.com/yuxli066/RC-AUTO-Car",
        },
      ],
      gridLength: 12,
      class: [
        "animate0",
        "animate1",
        "animate2",
        "animate3",
        "animate4",
        "animate5",
        "animate6",
        "animate7",
        "animate8",
      ],
    },
    [toValidJsonKey("cat contact-me.txt")]: {
      content: ["Contact me via my email @"],
      email: "leoli7405@gmail.com",
      gridLength: 12,
      class: ["animate0", "animate1"],
    },
  });
  const commandRef = useRef(null);
  const caretRef = useRef(null);
  const [currentCommand, setCurrentCommand] = useState("");
  const [currentCaretIndex, setCurrentCaretIndex] = useState(null);
  const forceRepaint = () => {
    requestAnimationFrame(() => {
      // eslint-disable-next-line no-shadow
      const sel = window.getSelection();
      const range = document.createRange();
      const el = commandRef.current;
      if (!el || !document.body.contains(el)) {
        return;
      }

      // clear ui text nodes
      range.selectNodeContents(el);
      range.deleteContents();
      range.collapse(false); // move caret to end
      sel.removeAllRanges();
      sel.addRange(range);
      el.appendChild(document.createTextNode(""));
    });
  };
  useEffect(() => {
    if (currentCommand === "") {
      commandRef.current.textContent = "";
      commandRef.current.innerText = "";
      forceRepaint();
    }
  }, [currentCommand]);
  useEffect(() => {
    requestAnimationFrame(() => {
      const calculateIndex = () => currentCommand.length - currentCaretIndex;
      const caretPos = calculateIndex();
      // move caret
      caretRef.current.style.right = `${caretPos * 10.80125}px`;
    });
  }, [currentCaretIndex]);
  const handleCommand = (shellCommand) => {
    // handle command
    if (shellCommand === "clear") {
      setPastCommands([]);
    } else if (validCommands.indexOf(shellCommand) === -1) {
      // we need to break the invalid input up into lines
      try {
        const CHAR_LIMIT = 88;
        const COMMAND_KEY = toValidJsonKey(shellCommand);
        const invalidCommand = `${shellCommand}: command not found.`;
        let invalidCommandContent = [`${invalidCommand}`];
        if (invalidCommand.length >= CHAR_LIMIT) {
          const breakUpLongWord = (invalidString) => {
            const stringArr = [];
            let pointer = 0;
            for (let i = 0; i < invalidString.length; i += 1) {
              if (i === pointer + CHAR_LIMIT) {
                stringArr.push(invalidString.slice(pointer, i + 1));
                pointer = i + 1;
              } else if (
                i < pointer + CHAR_LIMIT &&
                i === invalidString.length - 1
              ) {
                stringArr.push(invalidString.slice(pointer, i + 1));
              }
            }
            return stringArr;
          };
          invalidCommandContent = breakUpLongWord(invalidCommand);
        }
        setCommandObjectState((oldState) => ({
          ...oldState,
          [COMMAND_KEY]: {
            content: invalidCommandContent,
            gridLength: 12,
            class: invalidCommandContent.map((_, index) => `animate${index}`),
          },
        }));
        setPastCommands((prevCommands) => [...prevCommands, shellCommand]);
      } catch (e) {
        console.error(e);
      }
    } else {
      setPastCommands((prevCommands) => [...prevCommands, shellCommand]);
    }
  };
  const trackInputChanged = (e) => {
    const shellUsername = new RegExp(
      "yuxuanleoli@desktop:~/portfolio\\s\\$",
      "gm",
    );
    const text = String(e.target.innerText).replace(shellUsername, ""); // trimStart
    let previousText = "";
    setCurrentCommand((prevText) => {
      previousText = prevText;
      return text;
    });
    setCurrentCaretIndex((prevIndex) => {
      // if user has not clicked left arrow yet.
      if (prevIndex === null || text.length === 0) {
        return text.length;
      }
      // handle insertions & deletions
      if (previousText.length > text.length) {
        return prevIndex - 1 < 0 ? 0 : prevIndex - 1;
      }
      return prevIndex + 1 > text.length ? text.length : prevIndex + 1;
    });
  };
  const handleKeyDown = (e) => {
    const sel = window.getSelection();
    const { focusNode, focusOffset, anchorOffset } = sel;

    if (/^[a-zA-Z0-9]$/.test(e.key)) {
      return;
    }

    // prevent backspace if caret is at offset 0 of an editable node
    if (e.key === "Backspace") {
      if (anchorOffset === 0 || focusOffset === 0) {
        e.preventDefault();
        return;
      }
      if (currentCaretIndex === 0) {
        e.preventDefault();
        return;
      }
    }
    // handle 'Arrow Left'
    if (e.key === "ArrowLeft") {
      if (currentCaretIndex === 0) {
        e.preventDefault();
        return;
      }
      setCurrentCaretIndex((prevIndex) =>
        prevIndex - 1 > 0 ? prevIndex - 1 : 0,
      );
    }
    // handle 'Arrow Right'
    if (e.key === "ArrowRight") {
      if (
        focusNode.nodeType === Node.TEXT_NODE &&
        focusOffset === focusNode.textContent.length + 1
      ) {
        e.preventDefault();
        return;
      }
      if (currentCaretIndex === currentCommand.length) {
        e.preventDefault();
        return;
      }
      // eslint-disable-next-line max-len
      setCurrentCaretIndex((prevIndex) =>
        prevIndex + 1 > currentCommand.length
          ? currentCommand.length
          : prevIndex + 1,
      );
    }
    // handle 'Enter'
    if (e.key === "Enter") {
      try {
        e.preventDefault(); // prevent default <p> tag from being inserted
        // const shellCommand = String(currentCommand).replace(shellUsername, '').trimStart();
        handleCommand(currentCommand);
        setCurrentCommand(() => "");
        setCurrentCaretIndex(() => 0);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleClickInside = () => {
    const sel = window.getSelection();
    const commandEl = commandRef.current;

    if (!sel || !commandEl) return;

    const { focusNode } = sel;

    // If the click landed outside commandRef, snap cursor back to end
    if (!commandEl.contains(focusNode)) {
      const range = document.createRange();
      if (!commandEl || !document.body.contains(commandEl)) {
        return;
      }
      range.selectNodeContents(commandEl);
      range.collapse(false); // move to end of content
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };
  const disable = (e) => {
    e.preventDefault();
  };
  const handleBeforeInput = (e) => {
    const shellUsername = new RegExp(
      "yuxuanleoli@desktop:~/portfolio\\s\\$",
      "gm",
    );
    const text = String(e.target.innerText).replace(shellUsername, ""); // trimStart
    if (e.data === ". ") {
      let previousText = "";
      setCurrentCommand((prevText) => {
        previousText = prevText;
        return text;
      });
      setCurrentCaretIndex((prevIndex) => {
        // if user has not clicked left arrow yet.
        if (prevIndex === null || text.length === 0) {
          return text.length;
        }
        // handle insertions & deletions
        if (previousText.length > text.length) {
          return prevIndex - 1 < 0 ? 0 : prevIndex - 1;
        }
        return prevIndex + 1 > text.length ? text.length : prevIndex + 1;
      });
    }
  };
  return (
    <Container className="container-styles">
      <PostIt type="contact" />
      <Grid container spacing={0} className="grid-styles">
        {pastCommands &&
          pastCommands
            .map((cmd) => String(cmd).trim())
            .map((command, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={`${command}-${index}`}>
                <Grid item xs={12}>
                  <div
                    className="input-styles"
                    style={{
                      userSelect: "none",
                      width: "100%",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all",
                      overflowWrap: "anywhere",
                    }}
                  >
                    <p style={{ margin: 0, userSelect: "none" }}>
                      <span>
                        <span className="shell">yuxuanleoli@desktop:</span>
                        <span className="path">~/portfolio $</span>
                      </span>
                      <span
                        style={{
                          margin: "0.15em",
                        }}
                      >
                        {command}
                      </span>
                    </p>
                  </div>
                </Grid>
                {commandObjectState[toValidJsonKey(command)].content.map(
                  (results, i) => (
                    <Grid
                      item
                      xs={
                        commandObjectState[toValidJsonKey(command)].gridLength
                      }
                      /* eslint-disable-next-line react/no-array-index-key */
                      key={`${results}-${i}`}
                    >
                      {
                        // eslint-disable-next-line no-nested-ternary
                        command === "cat work-experiences.txt" ? (
                          <ul>
                            <li>
                              <p
                                className={
                                  commandObjectState[toValidJsonKey(command)]
                                    .class[i]
                                }
                              >
                                <span className="color-yellow">
                                  {results[0]}
                                </span>
                              </p>
                              <ul>
                                {Object.values(results[1]).map((description) =>
                                  typeof description === "string" ? (
                                    <li className="list-styles">
                                      <p
                                        className={
                                          commandObjectState[
                                            toValidJsonKey(command)
                                          ].class[i]
                                        }
                                      >
                                        <span className="color-pink">&gt;</span>{" "}
                                        &#8195;
                                        {description}
                                      </p>
                                    </li>
                                  ) : (
                                    <>
                                      <li className="list-styles">
                                        <p
                                          className={
                                            commandObjectState[
                                              toValidJsonKey(command)
                                            ].class[i]
                                          }
                                        >
                                          <span className="color-pink">
                                            &gt;
                                          </span>{" "}
                                          &#8195;
                                          {description[0]}
                                        </p>
                                      </li>
                                      <li className="list-styles2">
                                        <p
                                          className={
                                            commandObjectState[
                                              toValidJsonKey(command)
                                            ].class[i]
                                          }
                                        >
                                          &#8195;
                                          {description[1]}
                                        </p>
                                      </li>
                                    </>
                                  ),
                                )}
                              </ul>
                            </li>
                            <br />
                          </ul>
                        ) : // eslint-disable-next-line no-nested-ternary
                        command === "cat contact-me.txt" ? (
                          <p
                            className={
                              commandObjectState[toValidJsonKey(command)].class[
                                i
                              ]
                            }
                            style={{ marginLeft: "22%" }}
                          >
                            <span className="color-white">{results}</span>
                            <a
                              href="mailto::leoli7405@gmail.com"
                              className="color-pink"
                            >
                              {
                                commandObjectState[toValidJsonKey(command)]
                                  .email
                              }
                              <span className="color-white">
                                &#8195;
                                {"<---"} click me!
                              </span>
                            </a>
                          </p>
                        ) : // eslint-disable-next-line no-nested-ternary
                        command === "cat about-me.txt" ? (
                          <p
                            className={
                              commandObjectState[toValidJsonKey(command)].class[
                                i
                              ]
                            }
                          >
                            <span className="color-primary">{results}</span>
                            <br />
                          </p>
                        ) : command === "cat my-projects.txt" ? (
                          <p
                            className={
                              commandObjectState[toValidJsonKey(command)].class[
                                i
                              ]
                            }
                          >
                            <a
                              href={results.link}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <span className="color-primary">
                                {results.name}
                              </span>{" "}
                              &#8195;
                              {"<---"} click me!
                            </a>
                          </p>
                        ) : (
                          <>
                            {results !== "RESUME" && (
                              <p>
                                <span
                                  className={`${commandObjectState[toValidJsonKey(command)].class[i]} color-white`}
                                  style={{
                                    wordBreak: "break-all",
                                  }}
                                >
                                  {results}
                                </span>
                              </p>
                            )}
                            {results === "RESUME" && (
                              <p
                                className={
                                  commandObjectState[toValidJsonKey(command)]
                                    .class[i]
                                }
                              >
                                <a
                                  href="https://drive.google.com/file/d/14yyn6ct_GIblKy87MSOG8N0wvak8SJpT/view?usp=sharing"
                                  rel="noreferrer"
                                  target="_blank"
                                  className="color-blue"
                                >
                                  {results}
                                  <span className="color-white">
                                    {" <---"} click me!
                                  </span>
                                </a>
                              </p>
                            )}
                          </>
                        )
                      }
                    </Grid>
                  ),
                )}
              </React.Fragment>
            ))}
        <Grid item xs={12}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            contentEditable
            suppressContentEditableWarning
            className="input-styles"
            style={{
              caretColor: "transparent",
              userSelect: "none",
              width: "100%",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              overflowWrap: "anywhere",
            }}
            onPaste={disable}
            onCopy={disable}
            onCut={disable}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            onInput={trackInputChanged}
            onKeyDown={handleKeyDown}
            onMouseUp={handleClickInside}
            onBeforeInput={handleBeforeInput}
          >
            <p style={{ margin: 0, userSelect: "none" }}>
              <span contentEditable={false}>
                <span contentEditable={false} className="shell">
                  yuxuanleoli@desktop:
                </span>
                <span contentEditable={false} className="path">
                  ~/portfolio $
                </span>
              </span>
              <span
                style={{
                  margin: "0.15em",
                }}
                ref={commandRef}
              />
              <Caret caretRef={caretRef} />
            </p>
          </div>
        </Grid>
      </Grid>
      <PostIt type="commands" />
    </Container>
  );
}

export default Projects;
