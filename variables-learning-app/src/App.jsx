import React, { useState } from 'react';
import { Play, RotateCcw, Lightbulb, Check, X } from 'lucide-react';

export default function VariablesLearningApp() {
  const [currentSection, setCurrentSection] = useState(0);
  const [code1, setCode1] = useState('user_prompt = "Explain quantum physics"');
  const [output1, setOutput1] = useState('');
  const [code2, setCode2] = useState('tokens = 150\ntemperature = 0.7\nis_complete = True');
  const [output2, setOutput2] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});
  
  const sections = [
    { id: 0, title: "What Are Variables?", icon: "📦" },
    { id: 1, title: "Data Types in AI", icon: "🔢" },
    { id: 2, title: "Practice Time", icon: "✏️" },
    { id: 3, title: "Quick Quiz", icon: "🎯" }
  ];

  const runCode1 = () => {
    try {
      const match = code1.match(/user_prompt\s*=\s*["'](.+)["']/);
      if (match) {
        setOutput1(`✓ Variable created!\n\nuser_prompt = "${match[1]}"\n\nType: string\nLength: ${match[1].length} characters`);
      } else {
        setOutput1('❌ Try creating a variable like:\nuser_prompt = "your text here"');
      }
    } catch (e) {
      setOutput1('❌ Something went wrong. Check your syntax!');
    }
  };

  const runCode2 = () => {
    try {
      const lines = code2.split('\n').filter(l => l.trim());
      let result = '✓ Variables created!\n\n';
      
      lines.forEach(line => {
        const [varName, value] = line.split('=').map(s => s.trim());
        let type = 'unknown';
        let displayValue = value;
        
        if (/^["'].*["']$/.test(value)) {
          type = 'string';
          displayValue = value;
        } else if (!isNaN(value) && !value.includes('.')) {
          type = 'integer';
        } else if (!isNaN(value) && value.includes('.')) {
          type = 'float';
        } else if (value === 'True' || value === 'False') {
          type = 'boolean';
        }
        
        result += `${varName} = ${displayValue} (${type})\n`;
      });
      
      setOutput2(result);
    } catch (e) {
      setOutput2('❌ Check your syntax!');
    }
  };

  const quizQuestions = [
    {
      q: "What data type would you use to store a user's chat message?",
      options: ["Integer", "String", "Boolean", "Float"],
      correct: 1
    },
    {
      q: "What data type is best for storing the number of tokens in a response?",
      options: ["String", "Boolean", "Integer", "Float"],
      correct: 2
    },
    {
      q: "If you want to track whether an AI model has finished generating, what type would you use?",
      options: ["Boolean", "String", "Integer", "List"],
      correct: 0
    }
  ];

  const checkQuiz = (qIndex, ansIndex) => {
    setQuizAnswers({...quizAnswers, [qIndex]: ansIndex});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Variables & Data Types</h1>
          <p className="text-gray-600">Learn the building blocks of AI code</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                currentSection === section.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </button>
          ))}
        </div>

        {/* Section 0: What Are Variables */}
        {currentSection === 0 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What's a Variable?</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Think of a variable as a <strong>labeled container</strong> that holds information. 
                In AI applications, we use variables to store things like user messages, AI responses, 
                settings, and results.
              </p>
              
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded mb-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="text-indigo-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-indigo-900 mb-1">AI Example</p>
                    <p className="text-indigo-800">When you chat with an AI, your message is stored in a variable so the AI can process it!</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Real AI Code Example:</h3>
                <pre className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`user_prompt = "Explain how solar panels work"
model_response = "Solar panels convert sunlight..."
conversation_length = 2`}
                </pre>
              </div>

              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Try It Yourself!</h3>
              <p className="text-gray-600 mb-3">Create a variable to store a question you'd ask an AI:</p>
              
              <textarea
                value={code1}
                onChange={(e) => setCode1(e.target.value)}
                className="w-full font-mono text-sm p-4 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none mb-3"
                rows="2"
                placeholder='user_prompt = "your question here"'
              />
              
              <button
                onClick={runCode1}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <Play size={16} />
                Run Code
              </button>

              {output1 && (
                <div className="mt-4 bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                  {output1}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 1: Data Types */}
        {currentSection === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Types in AI</h2>
              <p className="text-gray-700 mb-6">
                Different types of data need different containers. Here are the main types you'll see in AI code:
              </p>

              <div className="grid gap-4 mb-6">
                <div className="border-2 border-purple-200 bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-purple-900 mb-2">📝 String (text)</h3>
                  <p className="text-gray-700 mb-2">Text data wrapped in quotes</p>
                  <code className="bg-purple-100 px-3 py-1 rounded text-sm">prompt = "Hello, AI!"</code>
                  <p className="text-sm text-gray-600 mt-2">Used for: messages, responses, commands</p>
                </div>

                <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-2">🔢 Integer (whole numbers)</h3>
                  <p className="text-gray-700 mb-2">Numbers without decimals</p>
                  <code className="bg-blue-100 px-3 py-1 rounded text-sm">token_count = 150</code>
                  <p className="text-sm text-gray-600 mt-2">Used for: counting tokens, message IDs, limits</p>
                </div>

                <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-green-900 mb-2">🎯 Float (decimals)</h3>
                  <p className="text-gray-700 mb-2">Numbers with decimal points</p>
                  <code className="bg-green-100 px-3 py-1 rounded text-sm">temperature = 0.7</code>
                  <p className="text-sm text-gray-600 mt-2">Used for: AI settings, probabilities, scores</p>
                </div>

                <div className="border-2 border-orange-200 bg-orange-50 rounded-lg p-4">
                  <h3 className="font-bold text-orange-900 mb-2">✓ Boolean (true/false)</h3>
                  <p className="text-gray-700 mb-2">Only two values: True or False</p>
                  <code className="bg-orange-100 px-3 py-1 rounded text-sm">is_complete = True</code>
                  <p className="text-sm text-gray-600 mt-2">Used for: status checks, flags, toggles</p>
                </div>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded mb-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="text-indigo-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-indigo-900 mb-1">Why Data Types Matter in AI</p>
                    <p className="text-indigo-800">AI models process different types of data differently. Text gets converted to tokens, numbers control behavior, and booleans track states!</p>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Practice: Create Multiple Variables</h3>
              <p className="text-gray-600 mb-3">Try creating variables of different types for an AI chat:</p>
              
              <textarea
                value={code2}
                onChange={(e) => setCode2(e.target.value)}
                className="w-full font-mono text-sm p-4 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none mb-3"
                rows="4"
                placeholder='tokens = 150&#10;temperature = 0.7&#10;is_complete = True'
              />
              
              <button
                onClick={runCode2}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <Play size={16} />
                Run Code
              </button>

              {output2 && (
                <div className="mt-4 bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                  {output2}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 2: Practice */}
        {currentSection === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Practice Scenarios</h2>
              
              <div className="space-y-6">
                <div className="border-2 border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-gray-800 mb-3">Scenario 1: Chat Interface</h3>
                  <p className="text-gray-700 mb-4">You're building a chat interface for an AI. What variables do you need?</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="font-mono text-sm text-gray-800">
{`user_message = "What's the weather today?"
ai_response = ""
message_count = 1
is_typing = True
max_tokens = 500`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    <strong>Notice:</strong> We use strings for text, integers for counts, booleans for states!
                  </p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-gray-800 mb-3">Scenario 2: AI Model Settings</h3>
                  <p className="text-gray-700 mb-4">Setting up an AI model requires various data types:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="font-mono text-sm text-gray-800">
{`model_name = "GPT-4"
temperature = 0.8
max_length = 2000
use_search = False
api_key = "sk-abc123xyz"`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    <strong>Real-world connection:</strong> These exact variable types are used in actual AI APIs!
                  </p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-gray-800 mb-3">Your Turn!</h3>
                  <p className="text-gray-700 mb-4">Create variables for tracking an AI conversation about cooking:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                    <li>The topic being discussed (string)</li>
                    <li>Number of messages exchanged (integer)</li>
                    <li>How creative the AI should be, from 0.0 to 1.0 (float)</li>
                    <li>Whether the conversation is still active (boolean)</li>
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-sm text-yellow-800">
                      <strong>Hint:</strong> Your code might look like:<br/>
                      <code>topic = "cooking tips"</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Quiz */}
        {currentSection === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Knowledge Check</h2>
              <p className="text-gray-600 mb-6">Test your understanding of variables and data types!</p>

              <div className="space-y-6">
                {quizQuestions.map((quiz, qIndex) => (
                  <div key={qIndex} className="border-2 border-gray-200 rounded-lg p-5">
                    <p className="font-semibold text-gray-800 mb-4">{qIndex + 1}. {quiz.q}</p>
                    <div className="space-y-2">
                      {quiz.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => checkQuiz(qIndex, oIndex)}
                          className={`w-full text-left p-3 rounded-lg border-2 transition ${
                            quizAnswers[qIndex] === oIndex
                              ? oIndex === quiz.correct
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {quizAnswers[qIndex] === oIndex && (
                              oIndex === quiz.correct ? (
                                <Check className="text-green-600" size={20} />
                              ) : (
                                <X className="text-red-600" size={20} />
                              )
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    {quizAnswers[qIndex] !== undefined && quizAnswers[qIndex] !== quiz.correct && (
                      <p className="mt-3 text-sm text-red-600">Try again! Think about what type of data this represents.</p>
                    )}
                    {quizAnswers[qIndex] === quiz.correct && (
                      <p className="mt-3 text-sm text-green-600">Correct! You've got it!</p>
                    )}
                  </div>
                ))}
              </div>

              {Object.keys(quizAnswers).length === quizQuestions.length && 
               Object.entries(quizAnswers).every(([qIdx, aIdx]) => aIdx === quizQuestions[qIdx].correct) && (
                <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">🎉 Excellent Work!</h3>
                  <p className="text-green-700">You've mastered variables and data types! You're ready for the next topic.</p>
                </div>
              )}
            </div>

            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
              <h3 className="font-bold text-indigo-900 mb-3">Key Takeaways</h3>
              <ul className="space-y-2 text-indigo-800">
                <li>✓ Variables are labeled containers for data</li>
                <li>✓ Strings hold text (like prompts and responses)</li>
                <li>✓ Integers count things (like tokens)</li>
                <li>✓ Floats represent precise numbers (like AI temperature)</li>
                <li>✓ Booleans track true/false states</li>
                <li>✓ Choosing the right data type helps AI systems work correctly</li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              currentSection === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
            disabled={currentSection === sections.length - 1}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              currentSection === sections.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}