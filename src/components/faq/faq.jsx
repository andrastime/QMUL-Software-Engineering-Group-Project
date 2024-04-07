import React from 'react'
import './faq.css'

const faq = () => {
  return (
    <>
        <div className="faq-item">
            <h1 className='faq-item-title'>How do I create a ticket?</h1>
            <p className='faq-item-description'>To the right of your dashboard header, locate the "Create Ticket" button and select it, a ticket creation form will then appear.
            First choose the type of ticket you will be submitting; "Lab", "Service", or "System". Afterwards, fill in the ticket details including a 
            relevant title and description of the issue.</p>
        </div>
        <div className="faq-item">
            <h1 className='faq-item-title'>How do I view my tickets?</h1>
            <p className='faq-item-description'>To view your tickets, navigate to the "Tickets" section of your dashboard. Here you will be able to see all 
            tickets you have submitted, as well as their current status. You can further filter the tickets that you see by applying filters on the selectors bar.</p>
        </div>
        <div className="faq-item">
            <h1 className='faq-item-title'>How do I apply for an extenuating circumstance?</h1>
            <p className='faq-item-description'>To apply for an extenuating circumstance, navigate to the "Apply for EC" section of your dashboard. Here you will 
            be able to fill in a form with details of your circumstance, including a title, description, and evidence. Once submitted, your application will be 
            reviewed by the relevant staff.</p>
        </div>
        <div className="faq-item">
            <h1 className='faq-item-title'>How does Queen Mary define Extenuating Circumstances?</h1>
            <p className='faq-item-description'>"Extenuating circumstances are circumstances that are outside a student's control and which may have a negative impact on a student's ability to undertake or complete any assessment so as to cast doubt the likely validity of the assessment as a measure of the student's achievement."</p>
        </div>
        <div className="faq-item">
            <h1 className='faq-item-title'>How do I review feedback for my module? (module staff)</h1>
            <p className='faq-item-description'>Module feedback is immediately available to review on your staff dashboard, a list of all feedback given would be shown,
            to view full details of a feedback item simply select the feedback you wish to view more details on and it would display the full title and description of the
            provided feedback. You can further filter the feedback items that you see by applying filters on the selectors bar e.g. feedback from a specific module or by a
            specific student</p>
            <p className='faq-item-description'>** Other universities use terms like mitigating circumstances to describe situations like this, but essentially 'extenuating circumstances' are those that are unforeseen and beyond your control.</p>
        </div>
        <div className="faq-item">
            <h1 className='faq-item-title'>How do I connect to Wi-Fi?</h1>
            <p className='faq-item-description'>Use CAT installers to connect to Universities' Wi-Fi securely - you can download and set-up CAT before arriving on campus!</p>
            <p className='faq-item-description'>Configuration using eduroam CAT sets up security so that your device will confirm that it is talking to the correct authentication server before sending your credentials (username and password), and will never send your password to an untrusted server.</p>
            <p className='faq-item-description'>You can already set this up from the comfort of your home or that holiday destination before the start of academic year!</p>
            <p className='faq-item-description'>We encourage you to do that as soon as you receive Queen Mary's account details.</p>
            <p className='faq-item-description'>BONUS! If you are in an area where Eduroam Wi-Fi is available (most UK-based Universities and some European-based Universities), you will be able to connect to their Wi-Fi free of charge.</p>
            <p className='faq-item-description'>Configuring a device for eduroam using the eduroam Configuration Assistance Tool (CAT)</p>
            <p className='faq-item-description'>1. Enter your QMUL username (e.g. ab16543@qmul.ac.uk)</p>
            <p className='faq-item-description'>2. Enter your password</p>

        </div>
        <div className="faq-item">
            <h1 className='faq-item-title'></h1>
            <p className='faq-item-description'></p>
        </div>
    </>
  )
}

export default faq
