import { Problem } from '../types/problem';

interface ChemistryQuestions {
  [chapter: string]: {
    [subtopic: string]: Problem[];
  };
}

export const chemistryQuestions: ChemistryQuestions = {
  'Some Basic Concepts of Chemistry': {
    'Mole Concept & Stoichiometry': [
      {
        id: 'sbc_1',
        title: 'Mole Concept',
        description: 'How many moles of CO₂ are present in 88g of CO₂? (Atomic mass: C = 12, O = 16)',
        subject: 'Chemistry',
        topic: 'Some Basic Concepts of Chemistry',
        subtopic: 'Mole Concept & Stoichiometry',
        difficulty: 'Easy',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '2 moles', isCorrect: true },
          { text: '1 mole', isCorrect: false },
          { text: '3 moles', isCorrect: false },
          { text: '4 moles', isCorrect: false },
        ],
      },
      {
        id: 'sbc_2',
        title: 'Limiting Reagent',
        description: '2g of H₂ reacts with 32g of O₂ to form H₂O. Which is the limiting reagent? (Atomic mass: H = 1, O = 16)',
        subject: 'Chemistry',
        topic: 'Some Basic Concepts of Chemistry',
        subtopic: 'Mole Concept & Stoichiometry',
        difficulty: 'Medium',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: 'H₂', isCorrect: true },
          { text: 'O₂', isCorrect: false },
          { text: 'Neither', isCorrect: false },
          { text: 'Both', isCorrect: false },
        ],
      }
    ],
    'Laws of Chemical Combination': [
      {
        id: 'lcc_1',
        title: 'Law of Conservation of Mass',
        description: 'In a chemical reaction, 32g of methane (CH₄) reacts with 128g of oxygen (O₂). What is the total mass of products formed?',
        subject: 'Chemistry',
        topic: 'Some Basic Concepts of Chemistry',
        subtopic: 'Laws of Chemical Combination',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '160g', isCorrect: true },
          { text: '96g', isCorrect: false },
          { text: '128g', isCorrect: false },
          { text: '192g', isCorrect: false },
        ],
      },
      {
        id: 'lcc_2',
        title: 'Law of Multiple Proportions',
        description: 'Carbon forms two oxides: CO and CO₂. For the same mass of carbon, the ratio of oxygen in CO₂ to CO is:',
        subject: 'Chemistry',
        topic: 'Some Basic Concepts of Chemistry',
        subtopic: 'Laws of Chemical Combination',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '2:1', isCorrect: true },
          { text: '1:2', isCorrect: false },
          { text: '1:1', isCorrect: false },
          { text: '4:1', isCorrect: false },
        ],
      }
    ]
  },
  'Structure of Atom': {
    'Quantum Mechanical Model': [
      {
        id: 'qmm_1',
        title: 'Quantum Numbers',
        description: 'What are the possible values of magnetic quantum number (m) for d-subshell?',
        subject: 'Chemistry',
        topic: 'Structure of Atom',
        subtopic: 'Quantum Mechanical Model',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '-2, -1, 0, +1, +2', isCorrect: true },
          { text: '-1, 0, +1', isCorrect: false },
          { text: '0', isCorrect: false },
          { text: '-3, -2, -1, 0, +1, +2, +3', isCorrect: false },
        ],
      },
      {
        id: 'qmm_2',
        title: 'Electron Configuration',
        description: 'Which of the following electron configurations represents the ground state of Fe²⁺?',
        subject: 'Chemistry',
        topic: 'Structure of Atom',
        subtopic: 'Quantum Mechanical Model',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '[Ar]3d⁶', isCorrect: true },
          { text: '[Ar]3d⁵4s¹', isCorrect: false },
          { text: '[Ar]3d⁴4s²', isCorrect: false },
          { text: '[Ar]3d⁸', isCorrect: false },
        ],
      }
    ]
  },
  'Chemical Bonding and Molecular Structure': {
    'VSEPR Theory': [
      {
        id: 'vsepr_1',
        title: 'Molecular Geometry',
        description: 'What is the shape of NH₃ molecule according to VSEPR theory?',
        subject: 'Chemistry',
        topic: 'Chemical Bonding and Molecular Structure',
        subtopic: 'VSEPR Theory',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: 'Trigonal pyramidal', isCorrect: true },
          { text: 'Tetrahedral', isCorrect: false },
          { text: 'Trigonal planar', isCorrect: false },
          { text: 'Linear', isCorrect: false },
        ],
      },
      {
        id: 'vsepr_2',
        title: 'Bond Angle',
        description: 'Which molecule has the largest H-X-H bond angle?',
        subject: 'Chemistry',
        topic: 'Chemical Bonding and Molecular Structure',
        subtopic: 'VSEPR Theory',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: 'H₂O', isCorrect: false },
          { text: 'H₂S', isCorrect: false },
          { text: 'BeH₂', isCorrect: true },
          { text: 'NH₃', isCorrect: false },
        ],
      }
    ]
  },
  'States of Matter': {
    'Ideal Gas Equation & Kinetic Theory': [
      {
        id: 'ige_1',
        title: 'Gas Laws',
        description: 'A gas occupies 2L at 300K and 1 atm. What volume will it occupy at 600K and 2 atm? (Assume ideal behavior)',
        subject: 'Chemistry',
        topic: 'States of Matter',
        subtopic: 'Ideal Gas Equation & Kinetic Theory',
        difficulty: 'Medium',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '2L', isCorrect: true },
          { text: '4L', isCorrect: false },
          { text: '1L', isCorrect: false },
          { text: '3L', isCorrect: false },
        ],
      },
      {
        id: 'ige_2',
        title: 'Root Mean Square Speed',
        description: 'At the same temperature, which gas has the highest root mean square speed?',
        subject: 'Chemistry',
        topic: 'States of Matter',
        subtopic: 'Ideal Gas Equation & Kinetic Theory',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: 'H₂', isCorrect: true },
          { text: 'O₂', isCorrect: false },
          { text: 'N₂', isCorrect: false },
          { text: 'CO₂', isCorrect: false },
        ],
      }
    ]
  },
  'Thermodynamics': {
    'First & Second Laws of Thermodynamics': [
      {
        id: 'thermo_1',
        title: 'First Law',
        description: 'For an isothermal process, what is the change in internal energy (ΔU)?',
        subject: 'Chemistry',
        topic: 'Thermodynamics',
        subtopic: 'First & Second Laws of Thermodynamics',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: 'Zero', isCorrect: true },
          { text: 'Positive', isCorrect: false },
          { text: 'Negative', isCorrect: false },
          { text: 'Cannot be determined', isCorrect: false },
        ],
      },
      {
        id: 'thermo_2',
        title: 'Entropy Change',
        description: 'In which process does the entropy of the system decrease?',
        subject: 'Chemistry',
        topic: 'Thermodynamics',
        subtopic: 'First & Second Laws of Thermodynamics',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: 'Freezing of water', isCorrect: true },
          { text: 'Evaporation of water', isCorrect: false },
          { text: 'Melting of ice', isCorrect: false },
          { text: 'Sublimation of iodine', isCorrect: false },
        ],
      }
    ]
  },
  'Solutions': {
    'Colligative Properties': [
      {
        id: 'cp_1',
        title: 'Boiling Point Elevation',
        description: 'What is the boiling point elevation when 1 mole of glucose is dissolved in 1 kg of water? (Kb for water = 0.52 K⋅kg/mol)',
        subject: 'Chemistry',
        topic: 'Solutions',
        subtopic: 'Colligative Properties',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '0.52 K', isCorrect: true },
          { text: '1.04 K', isCorrect: false },
          { text: '0.26 K', isCorrect: false },
          { text: '2.08 K', isCorrect: false },
        ],
      },
      {
        id: 'cp_2',
        title: 'Osmotic Pressure',
        description: 'Which solution will have the highest osmotic pressure at the same temperature and concentration?',
        subject: 'Chemistry',
        topic: 'Solutions',
        subtopic: 'Colligative Properties',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: 'Al₂(SO₄)₃', isCorrect: true },
          { text: 'NaCl', isCorrect: false },
          { text: 'Glucose', isCorrect: false },
          { text: 'CaCl₂', isCorrect: false },
        ],
      }
    ]
  },
  'Electrochemistry': {
    'Electrochemical Cells & EMF': [
      {
        id: 'ec_1',
        title: 'Cell Potential',
        description: 'What is the EMF of a Daniell cell at standard conditions? (E°(Zn²⁺/Zn) = -0.76V, E°(Cu²⁺/Cu) = +0.34V)',
        subject: 'Chemistry',
        topic: 'Electrochemistry',
        subtopic: 'Electrochemical Cells & EMF',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '1.10 V', isCorrect: true },
          { text: '0.42 V', isCorrect: false },
          { text: '-1.10 V', isCorrect: false },
          { text: '2.20 V', isCorrect: false },
        ],
      },
      {
        id: 'ec_2',
        title: 'Nernst Equation',
        description: 'At what temperature will the slope of Nernst equation (0.0591/n at 298K) become 0.0600/n?',
        subject: 'Chemistry',
        topic: 'Electrochemistry',
        subtopic: 'Electrochemical Cells & EMF',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '301 K', isCorrect: true },
          { text: '300 K', isCorrect: false },
          { text: '302 K', isCorrect: false },
          { text: '299 K', isCorrect: false },
        ],
      }
    ]
  }
}; 