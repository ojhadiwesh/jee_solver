import { Problem } from '../types/problem';

interface PhysicsQuestions {
  [chapter: string]: {
    [subtopic: string]: Problem[];
  };
}

export const physicsQuestions: PhysicsQuestions = {
  'Units, Dimensions & Measurement': {
    'Physical Quantities, Units & Dimensions': [
      {
        id: 'udm_1',
        title: 'Dimensional Analysis',
        description: 'What is the dimensional formula for force?',
        subject: 'Physics',
        topic: 'Units, Dimensions & Measurement',
        subtopic: 'Physical Quantities, Units & Dimensions',
        difficulty: 'Easy',
        timeLimit: 1,
        type: 'Single Choice',
        options: [
          { text: '[MLT⁻²]', isCorrect: true },
          { text: '[ML²T⁻²]', isCorrect: false },
          { text: '[MLT⁻¹]', isCorrect: false },
          { text: '[ML⁻¹T⁻²]', isCorrect: false },
        ],
      }
    ],
    'Measurement Techniques & Errors': [
      {
        id: 'mte_1',
        title: 'Percentage Error',
        description: 'If the radius of a circle is measured as 2.1 ± 0.02 cm, what is the percentage error in the measurement?',
        subject: 'Physics',
        topic: 'Units, Dimensions & Measurement',
        subtopic: 'Measurement Techniques & Errors',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '0.95%', isCorrect: true },
          { text: '1.05%', isCorrect: false },
          { text: '0.85%', isCorrect: false },
          { text: '1.15%', isCorrect: false },
        ],
      }
    ],
    'Significant Figures & Scientific Notation': [
      {
        id: 'sfn_1',
        title: 'Significant Figures',
        description: 'How many significant figures are there in the number 0.00340?',
        subject: 'Physics',
        topic: 'Units, Dimensions & Measurement',
        subtopic: 'Significant Figures & Scientific Notation',
        difficulty: 'Easy',
        timeLimit: 1,
        type: 'Single Choice',
        options: [
          { text: '3', isCorrect: true },
          { text: '5', isCorrect: false },
          { text: '2', isCorrect: false },
          { text: '4', isCorrect: false },
        ],
      },
      {
        id: 'sfn_2',
        title: 'Scientific Notation',
        description: 'Express 0.000456 in scientific notation.',
        subject: 'Physics',
        topic: 'Units, Dimensions & Measurement',
        subtopic: 'Significant Figures & Scientific Notation',
        difficulty: 'Easy',
        timeLimit: 1,
        type: 'Single Choice',
        options: [
          { text: '4.56 × 10⁻⁴', isCorrect: true },
          { text: '4.56 × 10⁴', isCorrect: false },
          { text: '45.6 × 10⁻⁵', isCorrect: false },
          { text: '0.456 × 10⁻³', isCorrect: false },
        ],
      }
    ]
  },
  'Mechanics & Properties of Matter': {
    'Kinematics': [
      {
        id: 'kin_1',
        title: 'Initial Velocity',
        description: 'A ball is thrown vertically upward with a velocity of 20 m/s. How high will it rise?',
        subject: 'Physics',
        topic: 'Mechanics & Properties of Matter',
        subtopic: 'Kinematics',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '20.4 m', isCorrect: true },
          { text: '10.2 m', isCorrect: false },
          { text: '40.8 m', isCorrect: false },
          { text: '15.3 m', isCorrect: false },
        ],
      },
      {
        id: 'kin_2',
        title: 'Projectile Motion',
        description: 'A projectile is fired with initial velocity 100 m/s at an angle of 30° with the horizontal. What is its maximum height? (g = 9.8 m/s²)',
        subject: 'Physics',
        topic: 'Mechanics & Properties of Matter',
        subtopic: 'Kinematics',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '127.55 m', isCorrect: true },
          { text: '255.1 m', isCorrect: false },
          { text: '63.78 m', isCorrect: false },
          { text: '509.2 m', isCorrect: false },
        ],
      },
      {
        id: 'kin_3',
        title: 'Relative Motion',
        description: 'A boat moves with a velocity of 3 m/s relative to water. If the water is flowing at 4 m/s eastward, what is the resultant velocity of the boat when it moves (a) eastward, (b) westward?',
        subject: 'Physics',
        topic: 'Mechanics & Properties of Matter',
        subtopic: 'Kinematics',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '7 m/s eastward, 1 m/s westward', isCorrect: true },
          { text: '7 m/s eastward, 1 m/s eastward', isCorrect: false },
          { text: '5 m/s eastward, 1 m/s westward', isCorrect: false },
          { text: '7 m/s westward, 1 m/s eastward', isCorrect: false },
        ],
      }
    ],
    'Laws of Motion': [
      {
        id: 'lom_1',
        title: 'Force Application',
        description: 'A force of 10 N acts on a mass of 2 kg. What is the acceleration produced?',
        subject: 'Physics',
        topic: 'Mechanics & Properties of Matter',
        subtopic: 'Laws of Motion',
        difficulty: 'Easy',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '5 m/s²', isCorrect: true },
          { text: '20 m/s²', isCorrect: false },
          { text: '2 m/s²', isCorrect: false },
          { text: '10 m/s²', isCorrect: false },
        ],
      },
      {
        id: 'lom_2',
        title: 'Friction',
        description: 'A block of mass 2 kg is placed on a rough horizontal surface with coefficient of friction 0.5. What minimum force is required to move the block? (g = 9.8 m/s²)',
        subject: 'Physics',
        topic: 'Mechanics & Properties of Matter',
        subtopic: 'Laws of Motion',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '9.8 N', isCorrect: true },
          { text: '19.6 N', isCorrect: false },
          { text: '4.9 N', isCorrect: false },
          { text: '14.7 N', isCorrect: false },
        ],
      }
    ],
    'Rotational Dynamics': [
      {
        id: 'rd_1',
        title: 'Moment of Inertia',
        description: 'What is the moment of inertia of a solid sphere of mass M and radius R about its diameter?',
        subject: 'Physics',
        topic: 'Mechanics & Properties of Matter',
        subtopic: 'Rotational Dynamics',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '2MR²/5', isCorrect: true },
          { text: 'MR²/2', isCorrect: false },
          { text: 'MR²/3', isCorrect: false },
          { text: '3MR²/5', isCorrect: false },
        ],
      }
    ]
  },
  'Thermal Physics': {
    'Thermal Properties of Matter': [
      {
        id: 'tpm_1',
        title: 'Specific Heat Capacity',
        description: 'How much heat energy is required to raise the temperature of 2 kg of water by 10°C? (Specific heat capacity of water = 4186 J/kg·K)',
        subject: 'Physics',
        topic: 'Thermal Physics',
        subtopic: 'Thermal Properties of Matter',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '83720 J', isCorrect: true },
          { text: '41860 J', isCorrect: false },
          { text: '167440 J', isCorrect: false },
          { text: '20930 J', isCorrect: false },
        ],
      }
    ]
  },
  'Oscillations & Waves': {
    'Simple Harmonic Motion': [
      {
        id: 'shm_1',
        title: 'Simple Pendulum',
        description: 'A simple pendulum has a time period of 2 seconds. What is its length? (g = 9.8 m/s²)',
        subject: 'Physics',
        topic: 'Oscillations & Waves',
        subtopic: 'Simple Harmonic Motion',
        difficulty: 'Medium',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '0.993 m', isCorrect: true },
          { text: '1.225 m', isCorrect: false },
          { text: '0.785 m', isCorrect: false },
          { text: '1.570 m', isCorrect: false },
        ],
      }
    ],
    'Wave Motion': [
      {
        id: 'wm_1',
        title: 'Wave Speed',
        description: 'A wave has a frequency of 500 Hz and wavelength of 0.5 m. Calculate its speed.',
        subject: 'Physics',
        topic: 'Oscillations & Waves',
        subtopic: 'Wave Motion',
        difficulty: 'Easy',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '250 m/s', isCorrect: true },
          { text: '1000 m/s', isCorrect: false },
          { text: '125 m/s', isCorrect: false },
          { text: '500 m/s', isCorrect: false },
        ],
      }
    ]
  },
  'Electrodynamics': {
    'Electrostatics': [
      {
        id: 'es_1',
        title: 'Coulomb\'s Law',
        description: 'Two point charges of 2 μC each are separated by a distance of 2 m in vacuum. Calculate the electrostatic force between them.',
        subject: 'Physics',
        topic: 'Electrodynamics',
        subtopic: 'Electrostatics',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '9 × 10⁻³ N', isCorrect: true },
          { text: '18 × 10⁻³ N', isCorrect: false },
          { text: '4.5 × 10⁻³ N', isCorrect: false },
          { text: '36 × 10⁻³ N', isCorrect: false },
        ],
      }
    ]
  },
  'Optics': {
    'Ray Optics': [
      {
        id: 'ro_1',
        title: 'Lens Formula',
        description: 'An object is placed 30 cm from a convex lens of focal length 20 cm. Calculate the image distance.',
        subject: 'Physics',
        topic: 'Optics',
        subtopic: 'Ray Optics',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '60 cm', isCorrect: true },
          { text: '40 cm', isCorrect: false },
          { text: '50 cm', isCorrect: false },
          { text: '45 cm', isCorrect: false },
        ],
      }
    ],
    'Wave Optics': [
      {
        id: 'wo_1',
        title: 'Young\'s Double Slit',
        description: 'In Young\'s double slit experiment, if the distance between the slits is halved and the distance between the screen and slits is doubled, what happens to the fringe width?',
        subject: 'Physics',
        topic: 'Optics',
        subtopic: 'Wave Optics',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: 'Increases 4 times', isCorrect: true },
          { text: 'Increases 2 times', isCorrect: false },
          { text: 'Decreases 4 times', isCorrect: false },
          { text: 'Remains the same', isCorrect: false },
        ],
      }
    ]
  },
  'Waves and Optics': {
    'Wave Properties': [
      {
        id: 'wp_1',
        title: 'Wave Interference',
        description: 'Two waves of equal amplitude and frequency meet at a point. If they are in phase, what is the resultant amplitude?',
        subject: 'Physics',
        topic: 'Waves and Optics',
        subtopic: 'Wave Properties',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: 'Twice the individual amplitude', isCorrect: true },
          { text: 'Zero', isCorrect: false },
          { text: 'Same as individual amplitude', isCorrect: false },
          { text: 'Half the individual amplitude', isCorrect: false },
        ],
      }
    ],
    'Geometrical Optics': [
      {
        id: 'go_1',
        title: 'Lens Formula',
        description: 'An object is placed 30 cm from a convex lens of focal length 20 cm. Where is the image formed?',
        subject: 'Physics',
        topic: 'Waves and Optics',
        subtopic: 'Geometrical Optics',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '60 cm', isCorrect: true },
          { text: '40 cm', isCorrect: false },
          { text: '50 cm', isCorrect: false },
          { text: '45 cm', isCorrect: false },
        ],
      }
    ]
  },
  'Modern Physics': {
    'Dual Nature of Matter & Radiation': [
      {
        id: 'dnm_1',
        title: 'Photoelectric Effect',
        description: 'Calculate the maximum kinetic energy of photoelectrons emitted when light of frequency 6 × 10¹⁴ Hz falls on a metal surface with work function 2 eV.',
        subject: 'Physics',
        topic: 'Modern Physics',
        subtopic: 'Dual Nature of Matter & Radiation',
        difficulty: 'Hard',
        timeLimit: 4,
        type: 'Single Choice',
        options: [
          { text: '0.48 eV', isCorrect: true },
          { text: '0.96 eV', isCorrect: false },
          { text: '0.24 eV', isCorrect: false },
          { text: '1.92 eV', isCorrect: false },
        ],
      }
    ],
    'Photoelectric Effect': [
      {
        id: 'pe_1',
        title: 'Work Function',
        description: 'The work function of a metal is 2.0 eV. What is the minimum frequency of light required to eject electrons from the metal surface? (h = 6.63 × 10⁻³⁴ J·s)',
        subject: 'Physics',
        topic: 'Modern Physics',
        subtopic: 'Photoelectric Effect',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '4.83 × 10¹⁴ Hz', isCorrect: true },
          { text: '3.32 × 10¹⁴ Hz', isCorrect: false },
          { text: '5.94 × 10¹⁴ Hz', isCorrect: false },
          { text: '2.41 × 10¹⁴ Hz', isCorrect: false },
        ],
      }
    ],
    'Nuclear Physics': [
      {
        id: 'np_1',
        title: 'Radioactive Decay',
        description: 'The half-life of a radioactive element is 20 days. What fraction of the original sample will remain after 60 days?',
        subject: 'Physics',
        topic: 'Modern Physics',
        subtopic: 'Nuclear Physics',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '1/8', isCorrect: true },
          { text: '1/4', isCorrect: false },
          { text: '1/6', isCorrect: false },
          { text: '1/3', isCorrect: false },
        ],
      },
      {
        id: 'np_2',
        title: 'Nuclear Binding Energy',
        description: 'Calculate the binding energy per nucleon for an atom with mass number 56 and mass defect of 0.528 amu. (1 amu = 931.5 MeV)',
        subject: 'Physics',
        topic: 'Modern Physics',
        subtopic: 'Nuclear Physics',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '8.8 MeV', isCorrect: true },
          { text: '7.6 MeV', isCorrect: false },
          { text: '9.2 MeV', isCorrect: false },
          { text: '6.4 MeV', isCorrect: false },
        ],
      },
    ],
    'Quantum Mechanics': [
      {
        id: 'qm_1',
        title: 'De Broglie Wavelength',
        description: 'Calculate the de Broglie wavelength of an electron accelerated through a potential difference of 100 V. (h = 6.63 × 10⁻³⁴ J·s, m = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C)',
        subject: 'Physics',
        topic: 'Modern Physics',
        subtopic: 'Quantum Mechanics',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '1.23 × 10⁻¹⁰ m', isCorrect: true },
          { text: '2.46 × 10⁻¹⁰ m', isCorrect: false },
          { text: '0.615 × 10⁻¹⁰ m', isCorrect: false },
          { text: '3.69 × 10⁻¹⁰ m', isCorrect: false },
        ],
      },
      {
        id: 'qm_2',
        title: 'Uncertainty Principle',
        description: 'If the uncertainty in position of an electron is 10⁻¹⁰ m, what is the minimum uncertainty in its momentum? (ℏ = 1.05 × 10⁻³⁴ J·s)',
        subject: 'Physics',
        topic: 'Modern Physics',
        subtopic: 'Quantum Mechanics',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '5.25 × 10⁻²⁵ kg·m/s', isCorrect: true },
          { text: '2.63 × 10⁻²⁵ kg·m/s', isCorrect: false },
          { text: '1.05 × 10⁻²⁴ kg·m/s', isCorrect: false },
          { text: '3.15 × 10⁻²⁵ kg·m/s', isCorrect: false },
        ],
      },
    ],
    'Special Relativity': [
      {
        id: 'sr_1',
        title: 'Time Dilation',
        description: 'A spaceship moves at 0.8c relative to Earth. If a process takes 2 seconds in the spaceship frame, how long does it appear to take for an observer on Earth?',
        subject: 'Physics',
        topic: 'Modern Physics',
        subtopic: 'Special Relativity',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '3.33 seconds', isCorrect: true },
          { text: '1.67 seconds', isCorrect: false },
          { text: '2.67 seconds', isCorrect: false },
          { text: '4.00 seconds', isCorrect: false },
        ],
      },
      {
        id: 'sr_2',
        title: 'Length Contraction',
        description: 'A rod has a proper length of 2 meters. At what speed must it travel for its length to be observed as 1 meter? (c = speed of light)',
        subject: 'Physics',
        topic: 'Modern Physics',
        subtopic: 'Special Relativity',
        difficulty: 'Hard',
        timeLimit: 3,
        type: 'Single Choice',
        options: [
          { text: '0.866c', isCorrect: true },
          { text: '0.5c', isCorrect: false },
          { text: '0.707c', isCorrect: false },
          { text: '0.933c', isCorrect: false },
        ],
      },
    ],
  },
  'Electronics & Communication': {
    'Semiconductor Electronics': [
      {
        id: 'se_1',
        title: 'P-N Junction',
        description: 'What is the barrier potential for a silicon P-N junction at room temperature?',
        subject: 'Physics',
        topic: 'Electronics & Communication',
        subtopic: 'Semiconductor Electronics',
        difficulty: 'Medium',
        timeLimit: 2,
        type: 'Single Choice',
        options: [
          { text: '0.7 V', isCorrect: true },
          { text: '0.3 V', isCorrect: false },
          { text: '1.1 V', isCorrect: false },
          { text: '0.5 V', isCorrect: false },
        ],
      }
    ]
  }
}; 