from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)  

SAMPLE_ITINERARIES = {
    1: """🌍 1-Day Adventure in {destination}

**Day 1: City Highlights**
- 9:00 AM: Visit famous landmarks
- 12:00 PM: Traditional lunch at local restaurant
- 2:00 PM: Museum and cultural sites
- 6:00 PM: Dinner with local cuisine
- 8:00 PM: Evening entertainment

💰 Budget: ₹{budget} for {travelers} person(s)
✨ Perfect short trip!""",

    2: """🌍 2-Day {destination} Experience

**Day 1: Cultural Exploration**
- Morning: Historical sites and temples
- Afternoon: Local market shopping
- Evening: Cultural show and dinner

**Day 2: Nature & Relaxation**
- Morning: Park or beach visit
- Afternoon: Adventure activities
- Evening: Farewell dinner

💰 Budget: ₹{budget} for {travelers} person(s)
📅 Well-balanced 2-day itinerary!""",

    3: """🌍 3-Day {destination} Adventure

**Day 1: Arrival & Exploration**
- Morning: Arrive and check into hotel
- Afternoon: City tour and orientation
- Evening: Welcome dinner

**Day 2: Deep Dive**
- Morning: Major attractions
- Afternoon: Local experiences
- Evening: Cultural activities

**Day 3: Memorable Finale**
- Morning: Last must-see spots
- Afternoon: Shopping and relaxation
- Evening: Departure preparations

💰 Budget: ₹{budget} for {travelers} person(s)
🎉 Amazing 3-day journey!"""
}

@app.route('/generate_itinerary', methods=['POST', 'GET'])
def generate_itinerary():
    try:
        if request.method == 'GET':
            return jsonify({'error': 'Use POST method'}), 400
            
        data = request.get_json()
        print("✅ Received request:", data)
        
        destination = data.get('destination', 'Your Destination')
        trip_days = int(data.get('trip_days', 1))
        budget = data.get('budget', 2000)
        travelers = data.get('travelers', 1)
        
        # Validate
        if trip_days not in [1, 2, 3]:
            return jsonify({'error': 'Only 1-3 days supported in demo'}), 400
        
        # Get sample itinerary
        itinerary_template = SAMPLE_ITINERARIES.get(trip_days, SAMPLE_ITINERARIES[1])
        itinerary = itinerary_template.format(
            destination=destination,
            budget=budget,
            travelers=travelers
        )
        
        return jsonify({
            'itinerary': itinerary,
            'days_generated': trip_days,
            'status': 'success',
            'timestamp': datetime.datetime.now().isoformat()
        })
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({
        'message': '✅ Backend is working perfectly!', 
        'status': 'success',
        'timestamp': datetime.datetime.now().isoformat()
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    print("🚀 Starting Travel Itinerary Server...")
    print("📍 Server URL: http://localhost:5000")
    print("🔗 Test URL: http://localhost:5000/test")
    print("📮 Generate itinerary: POST http://localhost:5000/generate_itinerary")
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)