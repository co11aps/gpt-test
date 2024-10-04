import { useState } from 'react';
import OpenAI from 'openai';
import css from './CompatibilityGenerator.module.css';

const CompatibilityGenerator = ({ language }) => {
  const [sign, setSign] = useState('virgo');
  const [sign2, setSign2] = useState('libra');
  const [horoscope, setHoroscope] = useState('');
  const [loading, setLoading] = useState(false);

  const openAIClient = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const fetchHoroscope = async () => {
    try {
      setLoading(true);
      const chatCompletion = await openAIClient.chat.completions.create({
        // model: 'gpt-4o',
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Generate a compatibility horoscope for two given zodiac signs, highlighting both potential challenges and positive aspects in their relationship. The horoscope should provide an optimistic outlook while acknowledging possible difficulties the couple may face.

# Steps

1. Identify the main traits associated with each of the two zodiac signs provided.
2. Analyze how these traits interact with each other, considering both harmonious and challenging aspects.
3. Highlight potential troubles within the relationship based on these interactions.
4. Conclude with an optimistic perspective on how the couple can overcome challenges and thrive together.

# Output Format

The response should be structured in three 100 words each cohesive paragraphs that includes:
- An introduction of the two zodiac signs and their key traits.
- Discussion of potential troubles in the relationship.
- An optimistic conclusion with advice or encouragement for the couple.

# Examples

**Input:** Aries and Libra  
**Output:** Aries, known for their boldness and passion, and Libra, famed for their charm and diplomacy, create a dynamic duo full of potential. 
However, Aries's impulsive nature might clash with Libra's desire for balance and harmony. 
Despite these challenges, by appreciating Aries's pioneering spirit and Libra's knack for nurturing relationships, this pair can enjoy a vibrant, successful partnership.`,
          },
          {
            role: 'user',
            content: `${sign} and ${sign2}. Give the answer in ${language} language.`,
          },
        ],
        max_tokens: 450,
      });

      const generatedHoroscope = chatCompletion.choices[0].message.content;
      setHoroscope(generatedHoroscope);
      console.log(chatCompletion);
    } catch (error) {
      console.error('Error fetching horoscope:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Compatibility Horoscope</h1>
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
      <select value={sign2} onChange={e => setSign2(e.target.value)}>
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
        <div className={css.horoscope}>
          {loading ? <p>Loading...</p> : <p>{horoscope}</p>}
        </div>
      </div>
    </div>
  );
};

export default CompatibilityGenerator;
