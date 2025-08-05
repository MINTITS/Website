export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();

    // Validate required fields
    if (!data.sender?.name || !data.sender?.email || !data.subject) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Missing required fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send email using Brevo API with environment variable
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': env.BREVO_API_KEY // Your Cloudflare environment variable
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Thank you for your business inquiry! We will review your request and contact you within 24 hours.'
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else {
      const errorData = await response.text();
      
      return new Response(JSON.stringify({
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}