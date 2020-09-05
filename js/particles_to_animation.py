import bpy

# Set these to False if you don't want to key that property.
KEYFRAME_LOCATION = True
KEYFRAME_ROTATION = True
KEYFRAME_SCALE = False
MATCHPARTICLE_SCALE = True
KEYFRAME_VISIBILITY = False  # Viewport and render visibility. set this to false otherwise animations don't export to gltf
RENAME_BONES = True

def create_objects_for_particles(ps, ps_name, particles_coll):
  # deselect particle source
  bpy.data.objects[ps_name].select_set(False)

  # store a ref for every object to match every particle
  obj_list = []

  # loop through particles to make a copy for each
  for i, _ in enumerate(ps.particles):
    # duplicate objects
    dupli = bpy.ops.object.duplicate()

    # select the recent duplicate objects
    activeObjects = bpy.context.selected_objects

    # loop through the objects
    for ob in activeObjects: 
      # get current parent collection   
      currColl = ob.users_collection[0]

      #unlink from that
      currColl.objects.unlink(ob)
      #add to newly created collection
      particles_coll.objects.link(ob)

      # pull out the armature to add to obj_list for animation
      if ob.type == 'ARMATURE':
          # add the new object to the list
          obj_list.append(ob)

  return obj_list

def match_and_keyframe_objects(ps, obj_list, start_frame, end_frame):
  # Match and keyframe the objects to the particles for every frame in the
  # given range.
  for frame in range(start_frame, end_frame + 1):
    print("frame {} processed".format(frame))
    bpy.context.scene.frame_set(frame)
    for p, obj in zip(ps.particles, obj_list):
      match_object_to_particle(p, obj)
      keyframe_obj(obj)

def match_object_to_particle(p, obj):
  # Match the location, rotation, scale and visibility of the object to
  # the particle.
  loc = p.location
  rot = p.rotation
  size = p.size

  if p.alive_state == 'ALIVE':
    vis = True
  else:
    vis = False

  obj.location = loc

  # Set rotation mode to quaternion to match particle rotation.
  obj.rotation_mode = 'QUATERNION'
  obj.rotation_quaternion = rot

  if MATCHPARTICLE_SCALE:
    obj.scale = (size, size, size)

  #obj.hide_viewport = not(vis) # <<<-- this was called "hide" in <= 2.79
  #obj.hide_render = not(vis)

def keyframe_obj(obj):
  # Keyframe location, rotation, scale and visibility if specified.
  if KEYFRAME_LOCATION:
    obj.keyframe_insert("location")
  if KEYFRAME_ROTATION:
    obj.keyframe_insert("rotation_quaternion")
  if KEYFRAME_SCALE:
    obj.keyframe_insert("scale")
  if KEYFRAME_VISIBILITY:
    obj.keyframe_insert("hide_viewport") # <<<-- this was called "hide" in <= 2.79
    obj.keyframe_insert("hide_render")

def rename_bones(particles_coll):
  #create count for naming bones
  count = 0

  #get the new copies collection
  coll = bpy.data.collections[particles_coll.name]

  #loop through collection
  for obj in coll.objects:
    #make a new name for each bone
    boneName = "bone_{}".format(count)

    #loop through bones in armature and rename
    if obj.type == 'ARMATURE':
        for bone in obj.data.bones:
            bone.name = boneName

      count = count + 1

def main():

  #set frame to 0 in case it isn't
  bpy.context.scene.frame_set(0)

  #in 2.8 you need to evaluate the Dependency graph in order to get data from animation, modifiers, etc
  depsgraph = bpy.context.evaluated_depsgraph_get()

  # The last object should be the one with the particle system.
  ps_obj = bpy.context.object
  ps_obj_evaluated = depsgraph.objects[ ps_obj.name ]
  ps_name = ps_obj.name

  ps = ps_obj_evaluated.particle_systems[0]  # Assume only 1 particle system is present.
  start_frame = bpy.context.scene.frame_start
  end_frame = bpy.context.scene.frame_end

  #create a new empty collection to store duplicates
  #do here so can pass to rename_bones
  particles_coll = bpy.data.collections.new(name="particle_copies")
  bpy.context.scene.collection.children.link(particles_coll)

  obj_list = create_objects_for_particles(ps, ps_name, particles_coll)

  match_and_keyframe_objects(ps, obj_list, start_frame, end_frame)   

  if RENAME_BONES:
    rename_bones(particles_coll)

if __name__ == '__main__':
  main()
