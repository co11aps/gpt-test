import { useState } from 'react';
import OpenAI from 'openai';

const HoroscopeGenerator = () => {
  const [sign, setSign] = useState('aries');
  const [language, setLanguage] = useState('Ukrainian');
  const [horoscope, setHoroscope] = useState('');

  const openAIClient = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  function getCurrentDate() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return currentDate.toLocaleDateString('en-US', options);
  }

  const fetchHoroscope = async () => {
    try {
      const chatCompletion = await openAIClient.chat.completions.create({
        // model: 'gpt-4o',
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Today is ${getCurrentDate()}. Generate a horoscope for today by incorporating planetary names and aspects.

# Steps

1. **Analyze Planetary Positions:** Determine the positions and aspects of planets relevant to the zodiac signs for the following day.
2. **Interpret Planetary Influence:** Understand how the combination of planets and their aspects might influence general traits, moods, and events.
3. **Craft Zodiac-Specific Horoscopes:** Write a personalized daily horoscope for each zodiac sign, taking into account their unique characteristics and how they might interact with the planetary influences.
4. **Use Engaging Language:** Ensure that the horoscope is engaging, relatable, and written in a positive or insightful tone.

# Output Format

- A concise paragraph of 150 words for selected zodiac sign.
- Mention of relevant planetary names and aspects where applicable.
- Reflect predictions or advice specific to each sign's potential experiences or feelings.

# Examples

- **Aries:** "With Mars trine Venus today, your drive for personal connections is intensified. Use this energy to explore new relationships or deepen existing ones."
- **Taurus:** "As the Moon squares Jupiter, you might feel a tug of war between indulgence and restraint. Stay grounded and listen to your instincts." 

(Each example should be adapted to fit the relevant planetary aspects and zodiac characteristics for the day in question.)`,
          },
          {
            role: 'user',
            content: `Generate a daily horoscope for ${sign} for today. Tell for what day the horoscope is. Give the answer in ${language} language.`,
          },
        ],
        max_tokens: 300,
      });

      const generatedHoroscope = chatCompletion.choices[0].message.content;
      setHoroscope(generatedHoroscope);
      console.log(chatCompletion);
    } catch (error) {
      console.error('Error fetching horoscope:', error);
    }
  };

  return (
    <div>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="Ukrainian">Ukrainian</option>
        <option value="English">English</option>
      </select>
      <h1>Today&apos;s Horoscope</h1>
      <select value={sign} onChange={e => setSign(e.target.value)}>
        <option value="aries">Aries</option>
        <option value="taurus">Taurus</option>
        <option value="gemini">Gemini</option>
        <option value="cancer">Cancer</option>
        <option value="leo">Leo</option>
        <option value="virgo">Virgo</option>
        <option value="libra">Libra</option>
        <option value="scorpio">Scorpio</option>
        <option value="sagittarius">Sagittarius</option>
        <option value="capricorn">Capricorn</option>
        <option value="aquarius">Aquarius</option>
        <option value="pisces">Pisces</option>
      </select>
      <button onClick={fetchHoroscope}>Get Horoscope</button>
      <div>
        <h2>Your Horoscope:</h2>
        <p>{horoscope}</p>
      </div>
    </div>
  );
};

export default HoroscopeGenerator;
