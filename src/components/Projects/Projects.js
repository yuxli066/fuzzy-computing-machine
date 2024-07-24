import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Input from '@material-ui/core/Input';
import { projects } from '../../portfolio';
import './Projects.scss';

const validCommands = [
  'ls',
  'cat about-me.txt',
  'cat work-experiences.txt',
  'cat contact-me.txt',
  'cat my-projects.txt',
  'clear',
];

function Projects() {
  if (!projects.length) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pastCommands, setPastCommands] = useState(['ls']);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentCommand, setCurrentCommand] = useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [commandObjectState, setCommandObjectState] = useState({
    ls: {
      content: [
        'about-me.txt',
        'work-experiences.txt',
        'contact-me.txt',
        'RESUME',
        'my-projects.txt',
      ],
      gridLength: 4,
      class: ['animate0', 'animate1', 'animate2', 'animate3', 'animate4'],
    },
    'cat about-me.txt': {
      content: [
        "Hi! My name is Leo and I'm a software engineer who's passionate about technology and ",
        'building software.',
        'I have over 5 years of experience working with web technology. ',
        'I am a full stack developer, but my expertise lies within building scalable automation ',
        'services using cutting edge tools & cloud technologies. ',
        'Outside of work, I enjoy working on cars, riding motorcycles, playing fps shooter games, ',
        'snowboarding, and sightseeing. ',
        'For my next role, I am looking to work with a small collaborative team in order to gain ',
        'more hands on experience with cloud technologies such as AWS or Azure and with building ',
        'infrastructure for large scale web applications. ',
      ],
      gridLength: 12,
      class: [
        'animate0',
        'animate1',
        'animate2',
        'animate3',
        'animate4',
        'animate5',
        'animate6',
        'animate7',
        'animate8',
        'animate9',
      ],
    },
    'cat work-experiences.txt': {
      content: [
        [
          'Walmart Global Tech - SDET - Nov 2023 – Present',
          {
            line1: [
              'Created and executed manual & automation tests, conducted periodic ',
              'measurement analysis. Delivered, and communicated test results. ',
            ],
            line2: [
              'Designed and implemented functional and end-to-end tests working at UI, API ',
              'and database levels. '
            ],
            line3: [
              'Contributed to planning and estimation activities, including monitoring processes and ',
              'reviewing QA deliverables and tasks. '
            ]
          },
        ],
        [
          'Visa - Sr. Software Test Engineer - April 2022 – August 2023',
          {
            line1: [
              'Created & executed test plans, test designs & test cases covering feature ',
              'integration, regression, and system level testing. ',
            ],
            line2: [
              'Contributed to API & UI functional automation frameworks using industry wide tools ',
              'and performed database testing on RDMBS & NoSQL based databases. ',
            ],
            line3:
              'Helped debug Linux/Unix/Container based application servers in Docker/Kubernetes. ',
          },
        ],
        [
          'Extron Electronics - Automation Engineer - Nov 2020 – Nov 2021',
          {
            line1:
              'Developed a software support dashboard used to execute 10,000 accessibility tests.',
            line2:
              'Created & configured a HAPROXY load balancer for network distribution.',
            line3:
              'Created & configured an Application Portal (layer 7) load balancer for Azure VMs.',
            line4:
              'Created scripts to automate database migrations and deployment cleanups. ',
            line5:
              'Created multiple accessibility microservices with over 500 downloads on docker hub.',
            line6:
              'Provided guidance to team members with strategies to help improve code optimization.',
          },
        ],
        [
          'Glidewell Dental Labs - QA Automation Engineer - Apr 2018 – Apr 2020',
          {
            line1:
              'Designed and built an automation framework used to test both UIs and services. ',
            line2: [
              'Set up CI/CD pipelines using Jenkins, Docker & AWS to automate the execution of ',
              'test builds. ',
            ],
            line3:
              'Developed a software support tool used to run selenium tests and restart services. ',
          },
        ],
        [
          'Software Engineer - DiagnosisAI - Feb 2017 - Oct 2018',
          {
            line1:
              'Contributed to the development effort of an automated doctor to patient service. ',
            line2:
              "Contributed to the development effort of the company's landing page. ",
          },
        ],
        [
          'Sony Pictures Entertainment - Automation Analyst - Sep 2017 – Apr 2018',
          {
            line1:
              'Contributed to the development effort of a Java/Python automation framework. ',
            line2: [
              'Developed automation tests for web apps, REST APIs, thick clients, and ',
              'other applications. ',
            ],
            line3: [
              'Collaborated with offshore developers for requirements gathering & framework ',
              'development. ',
            ],
          },
        ],
      ],
      gridLength: 12,
      class: [
        'animate0',
        'animate1',
        'animate2',
        'animate3',
        'animate4',
        'animate5',
        'animate6',
        'animate7',
        'animate8',
        'animate9',
        'animate10',
        'animate11',
        'animate12',
        'animate13',
        'animate14',
        'animate15',
        'animate16',
        'animate17',
        'animate18',
        'animate19',
        'animate20',
        'animate21',
        'animate22',
        'animate23',
        'animate24',
        'animate25',
        'animate26',
        'animate27',
        'animate28',
        'animate29',
        'animate30',
      ],
    },
    'cat my-projects.txt': {
      content: [
        {
          name: 'Auto Apply (Auto Apply to Jobs on LinkedIn)',
          link: 'https://github.com/yuxli066/HashiramaSenju',
        },
        {
          name: 'Del Rosa Massage (https://delrosamassage.co)',
          link: 'https://delrosamassage.co',
        },
        {
          name: 'Mom\'s Recipe Book (https://asianmomrecipes.com)',
          link: 'https://asianmomrecipes.com/',
        },
        {
          name: 'Bunny Battler',
          link: 'https://github.com/yuxli066/DanzoShimura',
        },
        {
          name: 'Clueless',
          link: 'https://github.com/yuxli066/Clueless',
        },
        {
          name: 'Stoxbot',
          link: 'https://github.com/yuxli066/stoxbot',
        },
        {
          name: 'IdentifyAI',
          link: 'https://x.com/identifyai',
        },
        {
          name: 'Twitter Sentiment Analyzer',
          link: 'https://github.com/yuxli066/TwitterSentimentAnalyzer',
        },
        {
          name: 'RC Auto Car',
          link: 'https://github.com/yuxli066/RC-AUTO-Car',
        },
      ],
      gridLength: 12,
      class: ['animate0', 'animate1', 'animate2', 'animate3', 'animate4', 'animate5', 'animate6', 'animate7', 'animate8'],
    },
    'cat contact-me.txt': {
      content: ['Contact me via my email @'],
      email: 'leoli7405@gmail.com',
      gridLength: 12,
      class: ['animate0', 'animate1'],
    },
  });

  const handleChange = (e) => {
    setCurrentCommand(e.target.value);
  };

  const handleCommand = (e) => {
    if (e.keyCode === 13) {
      if (currentCommand === 'clear') {
        setPastCommands([]);
      } else if (validCommands.indexOf(currentCommand) === -1) {
        setCommandObjectState((oldState) => ({
          ...oldState,
          [currentCommand]: {
            content: [`${currentCommand}: command not found.`],
            gridLength: 12,
            class: ['animate0'],
          },
        }));
        setPastCommands((prevCommands) => [...prevCommands, currentCommand]);
      } else {
        setPastCommands((prevCommands) => [...prevCommands, currentCommand]);
      }
      setCurrentCommand('');
    }
  };

  // TODO: add sticky note on the top right
  // TODO: add link to resume, change colors of name and contact icons
  return (
    <Container className="container-styles">
      <Grid container spacing={0} className="grid-styles">
        {pastCommands
          && pastCommands.map((command, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={`${command}-${index}`}>
              <Grid item xs={4.5}>
                <p>
                  <span className="shell">yuxuanleoli@desktop:</span>
                  <span className="path">~/portfolio $</span>
                </p>
              </Grid>
              <Grid item xs={7.5}>
                <p className="input-styles">{command}</p>
              </Grid>
              {commandObjectState[command].content.map((results, i) => (
                <Grid
                  item
                  xs={commandObjectState[command].gridLength}
                  /* eslint-disable-next-line react/no-array-index-key */
                  key={`${results}-${i}`}
                >
                  {
                    // eslint-disable-next-line no-nested-ternary
                    command === 'cat work-experiences.txt' ? (
                      <ul>
                        <li>
                          <p
                            className={commandObjectState[command].class[i]}
                          >
                            <span className="color-yellow">{results[0]}</span>
                          </p>
                          <ul>
                            {Object.values(results[1]).map(
                              (description, descIndex) => (typeof description === 'string' ? (
                                <li className="list-styles">
                                  <p
                                    className={
                                        commandObjectState[command].class[
                                          i
                                        ]
                                      }
                                  >
                                    <span className="color-pink">&gt;</span>
                                    {' '}
                                      &#8195;
                                    {description}
                                  </p>
                                </li>
                              ) : (
                                <>
                                  <li className="list-styles">
                                    <p
                                      className={
                                          commandObjectState[command].class[
                                            i
                                          ]
                                        }
                                    >
                                      <span className="color-pink">&gt;</span>
                                      {' '}
                                        &#8195;
                                      {description[0]}
                                    </p>
                                  </li>
                                  <li className="list-styles2">
                                    <p
                                      className={
                                          commandObjectState[command].class[
                                            i
                                          ]
                                        }
                                    >
                                        &#8195;
                                      {description[1]}
                                    </p>
                                  </li>
                                </>
                              )),
                            )}
                          </ul>
                        </li>
                        <br />
                      </ul>
                    ) // eslint-disable-next-line no-nested-ternary
                      : command === 'cat contact-me.txt' ? (
                        <p
                          className={commandObjectState[command].class[i]}
                          style={{ marginLeft: '22%' }}
                        >
                          <span className="color-white">{results}</span>
                          <a
                            href="mailto::leoli7405@gmail.com"
                            className="color-pink"
                          >
                            {commandObjectState[command].email}
                            <span className="color-white">
                            &#8195;
                              {'<---'}
                              {' '}
                              click me!
                            </span>
                          </a>
                        </p>
                      ) // eslint-disable-next-line no-nested-ternary
                        : command === 'cat about-me.txt' ? (
                          <p className={commandObjectState[command].class[i]}>
                            <span className="color-primary">{results}</span>
                            <br />
                          </p>
                        ) : command === 'cat my-projects.txt' ? (
                          <p className={commandObjectState[command].class[i]}>
                            <a href={results.link} rel="noreferrer" target="_blank">
                              <span className="color-primary">{results.name}</span>
                              {' '}
                          &#8195;
                              {'<---'}
                              {' '}
                              click me!
                            </a>
                          </p>
                        ) : (
                          <>
                            {results !== 'RESUME' && (
                            <p className={commandObjectState[command].class[i]}>
                              <span className="color-white">{results}</span>
                            </p>
                            )}
                            {results === 'RESUME' && (
                            <p className={commandObjectState[command].class[i]}>
                              <a
                                href="https://drive.google.com/file/d/11ZuLrN_m878e7AGAdjD6ly2UbNZPfOdk/view?usp=sharing"
                                rel="noreferrer"
                                target="_blank"
                                className="color-blue"
                              >
                                { results }
                                <span className="color-white">
                                  {' <---'}
                                  {' '}
                                  click me!
                                </span>
                              </a>
                            </p>
                            )}
                          </>
                        )
                  }
                </Grid>
              ))}
            </React.Fragment>
          ))}
        <Grid item xs={4.5}>
          <p>
            <span className="shell">yuxuanleoli@desktop:</span>
            <span className="path">~/portfolio $</span>
          </p>
        </Grid>
        <Grid item xs={7.5}>
          <Input
            onChange={handleChange}
            onKeyDown={handleCommand}
            value={currentCommand}
            className="input-styles"
            autoFocus
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Projects;
