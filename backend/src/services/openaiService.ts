import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const transcribeAudio = async (audioUrl: string): Promise<string> => {
  try {
    // Fetch audio file
    const response = await fetch(audioUrl);
    const audioBuffer = await response.arrayBuffer();
    const audioFile = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' });

    // Transcribe using Whisper
    const transcript = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'tr', // Turkish
    });

    return transcript.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
};

export const generateSummary = async (transcript: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert note-taking assistant. Create a concise summary of the following transcript.
          Response should be in Turkish and include:
          - Main points
          - Key decisions
          - Action items`,
        },
        {
          role: 'user',
          content: `Transcribe: ${transcript}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Summary generation error:', error);
    throw new Error('Failed to generate summary');
  }
};

export const generateMindMap = async (transcript: string): Promise<any> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Create a mind map structure from the following transcript in JSON format.
          Return a JSON object with nested structure representing the mind map.
          Response in Turkish.`,
        },
        {
          role: 'user',
          content: `Transcript: ${transcript}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    try {
      return JSON.parse(response.choices[0]?.message?.content || '{}');
    } catch {
      return { content: response.choices[0]?.message?.content };
    }
  } catch (error) {
    console.error('Mind map generation error:', error);
    throw new Error('Failed to generate mind map');
  }
};

export default openai;
